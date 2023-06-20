#! /usr/bin/env node
require("dotenv").config();
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

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  await createCategory(); // Call createCategory() first
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

async function itemCreate(
  title,
  price,
  category,
  size,
  image,
  imagetwo,
  imagethree
) {
  const itemdetail = {
    title: title,
    price: price,
    category,
    size,
    image,
    imagetwo,
  };
  if (imagethree != false) itemdetail.imagethree = imagethree;

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
      "Elevate Low White Onyx",
      141,
      categories[0],
      "medium",
      "https://cdn.staticsim.com/uploads/40210/cart/resources/20230608/003C3BAD-E0CC-5D36-C54D-A76F857E432A.jpg",
      "https://cdn.staticsim.com/uploads/40210/cart/resources/20230608/8350D70B-999E-B779-03BA-3BEFB5C99DFF.jpg",
      "https://cdn.staticsim.com/uploads/40210/cart/resources/20230608/D136E53D-C19D-FF27-A1C6-D9F35C5D2D23.jpg"
    ),
    itemCreate(
      "A.P.C T-Shirt",
      100,
      categories[1],
      "small",
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQiZ2uk9OWhy1qblerGhgjqfJ6bdaT0ldUx2j4DA5CZyL8S87gQ",
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQtmDE4McLhBqu4CbB86DTd0DrM7RKIXt6-ym53kbbgsm8wMxg5"
    ),
    itemCreate(
      "Burberry",
      757,
      categories[2],
      "small",
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS7khtF3GwouutpVY5eFRrNwOx6FAmtEc5UkUZ-wLD6DlaOiECD",
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRCyoCCF_lgf3ag0efP_Uc3faC2iPrQobT1ik5V_TuvVP8xY3Ah"
    ),
  ]);
}
