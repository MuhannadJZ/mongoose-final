// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const morgan = require("morgan")
const methodOverride = require("method-override")
const conntectToDB = require('./config/db')






// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride("_method")); // Changes the method based on the ?_method
app.use(morgan("dev")) // logs the requests as they are sent to our sever in the terminal




// connect to database
conntectToDB()


async function createRecipe(){

const newRecipe = {
 name: "Um Ali",
 ingredients: ["Puff Pastry","Milk"],
 instructions: "bake at 180C",
 prepTime: 120,
 difficulty: "Medium"
}

    const createdRecipe = await Recipe.create(newRecipe)
    console.log(createdRecipe)
}

createRecipe()

async function getAl(params) {
    
}



async function updateRecipe(recipeId, newRecipeData) {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      newRecipeData,
      { new: true }  // return the updated document
    );

    if (updatedRecipe) {
      console.log("Updated Recipe:", updatedRecipe);
    } else {
      console.log("No recipe found");
    }
  } catch (error) {
    console.error("Error updating recipe:", error.message);
  }
}






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












// Routes go here


const port = process.env.PORT || 3000


app.listen(port,()=>{
    console.log("Listening on port " + port)
}) 


