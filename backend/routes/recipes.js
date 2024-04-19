const express = require("express");
const Recipe = require("../models/recipeModel");
const router = express.Router();

const {
  createRecipe,
  getRecipe,
  getRecipes,
  deleteRecipe,
  updateRecipe,
} = require("../controllers/recipeController");

const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

// Get all recipes
router.get("/", getRecipes);

// Get a specific recipe
router.get("/:id", getRecipe);

// POST a new recipe
router.post("/", createRecipe);

// Delete a recipe
router.delete("/:id", deleteRecipe);

// Update a recipe
router.patch("/:id", updateRecipe);

module.exports = router;
