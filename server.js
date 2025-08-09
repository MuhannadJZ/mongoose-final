// Imports
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const methodOverride = require("method-override");
const connectToDB = require('./config/db');
const Recipe = require('./models/recipe'); 

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

// Connect to MongoDB
connectToDB();

// ========== Functions ========== //




async function createRecipe() {
  const newRecipe = {
    name: "Um Ali",
    ingredients: ["Puff Pastry", "Milk"],
    instructions: "bake at 180C",
    prepTime: 120,
    difficulty: "Medium"
  };

  try {
    const createdRecipe = await Recipe.create(newRecipe);
    console.log("Created Recipe:", createdRecipe);
  } catch (err) {
    console.log("Failed to create recipe.");
  }
}

async function getAllRecipes() {
  try {
    const recipes = await Recipe.find();
    recipes.forEach(recipe => {
      console.log(`${recipe.name} is an ${recipe.difficulty} recipe and takes ${recipe.prepTime} minutes to prepare.`);
    });
  } catch (err) {
    console.log("Failed to fetch recipes.");
  }
}



async function updateRecipe(recipeId, newRecipeData) {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, newRecipeData, { new: true });
    if (updatedRecipe) {
      console.log("Updated Recipe:", updatedRecipe);
    } else {
      console.log("No recipe found");
    }
  } catch (error) {
    console.error("Error updating recipe:", error.message);
  }}



async function deleteRecipe(recipeId) {
  try {
    const result = await Recipe.findByIdAndDelete(recipeId);
    if (result) {
      console.log("Recipe successfully deleted.");
    } else {
      console.log("No recipe found to delete.");
    }
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
}





async function getRecipeById(id) {
  try {
    const recipe = await Recipe.findById(id);
    if (recipe) {
      console.log("Found Recipe:", recipe);
    } else {
      console.log("No recipe with this ID exists.");
    }
  } catch (error) {
    console.error("Error finding recipe:", error.message);
  }
}


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
