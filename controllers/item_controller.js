const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
exports.index = asyncHandler(async (req, res, next) => {
  const count = req.session.cartCount || 0;
  res.render("index", {
    count,
  });
});
// Display list of all item.
exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find()
    .sort({ category: 1 })
    .populate("category")
    .exec();
  const count = req.session.cartCount || 0;
  res.render("item_list", { title: "Item List", item_list: allItems, count });
});

// Display detail page for a specific item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();
  if (item === null) {
    // No results.
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }
  const count = req.session.cartCount || 0;
  res.render("item_detail", {
    title: item.title,
    item: item,
    count,
  });
});
exports.item_detail_two = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();
  if (item === null) {
    // No results.
    const err = new Error("Book not found");
    err.status = 404;
    return next(err);
  }
  const count = req.session.cartCount || 0;
  res.render("item_detail_two", {
    title: item.title,
    item: item,
    count,
  });
});

exports.filter = asyncHandler(async (req, res, next) => {
  const { category, minPrice, maxPrice, sort, term } = req.query;
  let filter = {};

  if (category && category !== "") {
    const cat = await Category.findOne({ name: category });
    if (cat) {
      filter.category = cat._id;
    }
  }

  if (minPrice !== undefined && minPrice !== "") {
    filter.price = { $gte: minPrice };
  }

  if (maxPrice !== undefined && maxPrice !== "") {
    if (filter.price) {
      filter.price.$lte = maxPrice;
    } else {
      filter.price = { $lte: maxPrice };
    }
  }

  let sortOption = {};

  if (sort === "lowToHigh") {
    sortOption.price = 1;
  } else if (sort === "highToLow") {
    sortOption.price = -1;
  }

  let filteredItems;

  if (term) {
    const pipeline = [
      {
        $search: {
          index: "Searching",
          autocomplete: {
            query: term,
            path: "title",
            fuzzy: {
              maxEdits: 1,
            },
          },
        },
      },
    ];
    filteredItems = await Item.aggregate(pipeline);

    if (Object.keys(filter).length !== 0) {
      filteredItems = filteredItems.filter((item) => {
        return (
          (!category ||
            item.category.toString() === filter.category.toString()) &&
          (!minPrice || item.price >= minPrice) &&
          (!maxPrice || item.price <= maxPrice)
        );
      });
    }

    // Populate the 'category' field for each filtered item
    await Item.populate(filteredItems, { path: "category" });

    // Create a plain JavaScript object for each filtered item with the 'url' property
    filteredItems = filteredItems.map((item) => {
      return {
        title: item.title,
        price: item.price,
        category: item.category,
        image: item.image,
        size: item.size,
        url: `/catalog/item/${item._id}`,
      };
    });
  } else {
    filteredItems = await Item.find(filter)
      .sort(sortOption)
      .populate("category")
      .exec();

    // Create a plain JavaScript object for each filtered item with the 'url' property
    filteredItems = filteredItems.map((item) => {
      return {
        title: item.title,
        price: item.price,
        category: item.category,
        image: item.image,
        size: item.size,
        url: `/catalog/item/${item._id}`,
      };
    });
  }

  const count = req.session.cartCount || 0;
  res.render("item_list", {
    title: "Item List",
    item_list: filteredItems,
    count,
    category, // Pass the selected category value
    minPrice, // Pass the minimum price value
    maxPrice, // Pass the maximum price value
    sort, // Pass the selected sort option
    term, // Pass the search term
  });

  // Use the filteredItems as needed (e.g., send it as a response to the user)
});
