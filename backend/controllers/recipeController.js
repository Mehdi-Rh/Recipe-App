const Recipe = require("../models/recipeModel");
const mongoose = require("mongoose");

// get all recipes
const getRecipes = async (req, res) => {
  const recipes = await Recipe.find({}).sort({ createdAt: -1 });

  res.status(200).json(recipes);
};

// get a single recipe
const getRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recipe" });
  }

  const recipe = await Recipe.findById(id);

  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }

  res.status(200).json(recipe);
};

// create a new recipe
const createRecipe = async (req, res) => {
  const { name, preparation_time, cooking_time, description, public } =
    req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!preparation_time) {
    emptyFields.push("preparation_time");
  }
  if (!cooking_time) {
    emptyFields.push("cooking_time");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!public) {
    emptyFields.push("public");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  console.log({ user: req.user });

  try {
    const user_id = req.user._id;
    const recipe = await Recipe.create({
      name,
      preparation_time,
      cooking_time,
      description,
      public,
      user_id,
    });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a recipe
const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such recipe" });
  }

  const recipe = await Recipe.findOneAndDelete({ _id: id });

  if (!recipe) {
    return res.status(400).json({ error: "No such recipe" });
  }

  res.status(200).json(recipe);
};

// update a recipe
const updateRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such recipe" });
  }

  const recipe = await Recipe.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!recipe) {
    return res.status(400).json({ error: "No such recipe" });
  }

  res.status(200).json(recipe);
};

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
};
