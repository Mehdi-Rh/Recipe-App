const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    preparation_time: {
      type: Number,
      required: true,
    },
    cooking_time: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    public: {
      type: Boolean,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
