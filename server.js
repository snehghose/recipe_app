const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController');
const categoryController = require('./controllers/categoryController');
const path = require('path');

mongoose.connect(config.get('mongoURI'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/user', userController);
app.use('/api/recipe', recipeController);
app.use('/api/category', categoryController);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;
app.listen(port);