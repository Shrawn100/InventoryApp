var express = require("express");
var router = express.Router();

/* GET home page. 
module.exports = router;

*/
router.get("/", (req, res, next) => {
  res.redirect("/catalog");
});

module.exports = router;
