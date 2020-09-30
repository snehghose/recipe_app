const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    categoryId: String,
    description: String,
    time: Number,
    servings: Number,
    image: String,
    ingredients: [{
        type: String
    }],
    steps: [{
        type: String
    }],
    isApproved: Boolean
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;