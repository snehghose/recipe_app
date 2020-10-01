const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const Category = require('../models/category');
const router = require('express').Router();

router.get('/', async (req,res) => {
    const categories = await Category.find();
    res.send(categories);
});

router.get('/:name', async (req, res) => {
    const category = await Category.findOne({ name: req.params.name });
    res.send(category._id);
})

router.get('/id/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.send(category);
})

router.post('/', [auth, admin], async (req, res) => {
    let category = await Category.findOne({name: req.body.name});
    if(category) return res.status(400).send('Category already exists.');

    category = Category({
        name: req.body.name,
        image: req.body.image
    });
    
    await category.save(function(err) {
        if(err) throw err;
        res.send(category);
    });
})

router.put('/', [auth, admin], async (req, res) => {
    let category = await Category.findByIdAndRemove(req.body._id);
    if(!category) return res.status(404).send('Category with given ID does not exist.');

    category = Category({
        _id: req.body._id,
        name: req.body.name,
        image: req.body.image
    });

    await category.save(function(err) {
        if(err) throw err;
        res.send(category);
    });
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);
    if(!category) return res.status(404).send('Category with given ID does not exist.');

    res.send(category);
});

module.exports = router;