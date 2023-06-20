const express = require("express");
const router = express.Router();

const item_controller = require("../controllers/item_controller");
const cart_controller = require("../controllers/cart_controller");
// GET catalog home page.
router.get("/", item_controller.index);

// GET request for one item.
router.get("/item/:id", item_controller.item_detail);
//Get request for second img for item detail
router.get("/item/:id/2", item_controller.item_detail_two);

//POST request to add item to cart
router.post("/item/:id", cart_controller.cart_add);
router.get("/cart/add/:id", cart_controller.cart_increase);
// GET request for list of all item items.
router.get("/items", item_controller.item_list);

//
//

// GET request for list of all cart items.
router.get("/cart", cart_controller.cart_get);
router.get("/cart/reduce/:id", cart_controller.cart_reduce);
router.get("/cart/remove/:id", cart_controller.cart_remove);
router.get("/items/filter", item_controller.filter);

module.exports = router;
