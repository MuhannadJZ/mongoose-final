const mongoose = require("mongoose")
const recipeSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    ingredients: {
        type:[String],
        required:true
    },
    instructions: {
        type:String,
        
    },
    prepTime: {
        type:Number,
    },
    difficulty: {
        type:String,
        enum:["Easy","Medium","Hard"]
    },
    

})

// to export model

const Recipe = mongoose.model("Recipe",recipeSchema)

module.exports = Recipe
