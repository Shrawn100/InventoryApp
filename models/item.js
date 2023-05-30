const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  image: { type: String },
  size: {
    type: String,
    required: true,
    enum: ["small", "medium", "large"],
    default: "medium",
  },
});

ItemSchema.virtual("url").get(function () {
  return `/catalog/item/${this._id}`;
});

//Export model
module.exports = mongoose.model("Item", ItemSchema);
