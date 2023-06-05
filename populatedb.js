#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  await createItems();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

//Create Category

async function categoryCreate(name) {
  const category = new Category({ name: name });
  await category.save();
  categories.push(category);
  console.log(`Added category: ${name}`);
}
async function createCategory() {
  console.log("Adding genres");

  await categoryCreate("Shoes")
    .then(() => categoryCreate("Shirts"))
    .then(() => categoryCreate("Hoodies"));

  console.log("Categories added successfully.");
}
//Create Item

async function itemCreate(title, price, category, size, image) {
  const itemdetail = {
    title: title,
    price: price,
    category,
    size,
  };
  if (image != false) itemdetail.image = image;

  const item = new Item(itemdetail);
  await item.save();
  items.push(item);
  console.log(`Added Item: ${title}`);
}

async function createItems() {
  console.log("Adding items");
  console.log(categories);
  await Promise.all([
    itemCreate(
      "Air Jordan 1 Retro Low OG",
      600,
      categories[0],
      "medium",
      "https://kickstw.com.au/wp-content/uploads/2022/11/Air-Jordan-1-Retro-Low-OG-Zion-Williamson-Voodoo-1.jpg"
    ),
    itemCreate(
      "Chrome Hearts Cemetery",
      799,
      categories[1],
      "small",
      "https://kickstw.com.au/wp-content/uploads/2023/05/Chrome-Hearts-Cemetery-Tee-BlackYellowGreen-1.jpg"
    ),
    itemCreate(
      "Revenge Bejeweled Arc",
      300,
      categories[2],
      "small",
      "https://kickstw.com.au/wp-content/uploads/2023/05/Revenge-Bejeweled-Arc-Logo-Hoodie-Black-1.jpg"
    ),
  ]);
}
