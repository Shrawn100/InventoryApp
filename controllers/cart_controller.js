const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Item = require("../models/item");
const Session = mongoose.model("session", {});
const app = require("../app");

const Cart = require("../models/cart");

exports.cart_add = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  const qty = parseInt(req.body.quantity);
  const product = await Item.findById(productId).exec();
  if (!product) {
    return res.redirect("/");
  }
  cart.add(product, product.id, qty);
  req.session.cart = cart;
  req.session.cartCount = (req.session.cartCount || 0) + qty;

  res.redirect(`/catalog/item/${req.params.id}`);
});
exports.cart_increase = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.increaseByOne(productId);
  req.session.cartCount = req.session.cartCount + 1;
  req.session.cart = cart;

  res.redirect("/catalog/cart");
});

exports.cart_get = asyncHandler(async (req, res, next) => {
  if (!req.session.cart) {
    return res.render("cart", { products: null });
  }
  const cart = new Cart(req.session.cart);
  const count = req.session.cartCount || 0;
  return res.render("cart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
    count,
  });
});

exports.cart_reduce = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
  req.session.cartCount = req.session.cartCount - 1;
  req.session.cart = cart;

  res.redirect("/catalog/cart");
});

exports.cart_remove = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  req.session.cartCount = cart.totalQty;
  res.redirect("/catalog/cart");
});
