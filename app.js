var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const compression = require("compression");

var indexRouter = require("./routes/index");
const catalogRouter = require("./routes/catalog"); //Import routes for "catalog" area of site
const uniqid = require("uniqid");
const session = require("express-session");
var app = express();

require("dotenv").config();

// Set up rate limiter: maximum of twenty requests per minute

// Apply rate limiter to all requests

// …

//Set up mongoose connection
const { MongoClient, ServerApiVersion } = require("mongodb");

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
// Error handling for the session store

// Generate a unique secret key
const secretKey = uniqid();
const userKey = uniqid();
// Session middleware setup
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use("/catalog", catalogRouter); // Add catalog routes to middleware chain.

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

(module.exports = app), { userKey };
