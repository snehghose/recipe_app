const Recipe = require('../models/recipe');
const Category = require('../models/category');
const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
    const recipes = await Recipe.find({ isApproved: true });
    res.send(recipes);
});

router.get('/not-approved', [auth, admin], async (req, res) => {
    const recipes = await Recipe.find({ isApproved: false });
    res.send(recipes);
});

router.get('/category/:categoryId', async (req, res) => {
    const recipes = await Recipe.find({ categoryId: req.params.categoryId, isApproved: true });
    res.send(recipes);
});

router.get('/:name', async (req, res) => {
    const recipe = await Recipe.findOne({ name: req.params.name });
    res.send(recipe);
});

router.get('/check/:name', async (req, res) => {
    res.send(await Recipe.exists({ name: req.params.name }));
})

router.get('/id/:id', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.send(recipe);
});

router.post('/', auth, async (req, res) => {
    let recipe = await Recipe.findOne({name: req.body.name});
    if(recipe) return res.status(400).send('Recipe already exists.');

    const category = await Category.findById(req.body.categoryId);
    if(!category) return res.status(404).send('Category with given ID does not exist.');

    recipe = Recipe({
        name: req.body.name,
        categoryId: req.body.categoryId,
        description: req.body.description,
        time: req.body.time,
        servings: req.body.servings,
        image: req.body.image,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        isApproved: false
    });
    
    await recipe.save(function(err) {
        if(err) throw err;

        res.send(recipe);
    });
});

router.put('/:id', [auth, admin], async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if(!recipe) return res.status(400).send('Recipe does not exist.');

    await Recipe.deleteOne({_id:req.params.id});

    var newRecipe = Recipe({
        _id: recipe._id,
        name: recipe.name,
        categoryId: recipe.categoryId,
        description: recipe.description,
        time: recipe.time,
        servings: recipe.servings,
        image: recipe.image,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        isApproved: !recipe.isApproved
    });
    
    await newRecipe.save(function(err) {
        if(err) throw err;

        res.send(newRecipe);
    });
});


module.exports = router;