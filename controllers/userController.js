const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.get('/check/:username', async (req, res) => {
    res.send(await User.exists({ username: req.params.username }));
})

router.post('/', async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if(user) return res.status(400).send('Username already registered.');

    const salt = await bcrypt.genSalt(10);

    user = User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, salt),
        isAdmin: false
    });

    await user.save(function(err) {
        if (err) throw err;

        res.header('x-auth-token', user.generateAuthToken()).send({
            _id: user._id,
            username: user.username,
            isAdmin: user.isAdmin
        });
    });
});

router.post('/admin', [auth, admin], async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if(user) return res.status(400).send('Username already registered.');

    const salt = await bcrypt.genSalt(10);

    user = User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, salt),
        isAdmin: true
    });

    await user.save(function(err) {
        if (err) throw err;

        res.header('x-auth-token', user.generateAuthToken()).send({
            _id: user._id,
            username: user.username,
            isAdmin: user.isAdmin
        });
    });
});

router.post('/login', async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if(!user) return res.status(400).send('Invalid Username/Password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Username/Password');

    const token = {
        "token" : user.generateAuthToken()};
    res.send(token);
});

router.put('/', auth, async (req, res) => {
    let user = await User.findById(req.user._id);
    if(!user) return res.status(404).send('User with given ID does not exist.');

    const salt = await bcrypt.genSalt(10);
    await User.deleteOne({ _id: user.id });
    user = User({
        _id: req.user._id,
        username: user.username,
        password: await bcrypt.hash(req.body.password, salt),
        isAdmin: user.isAdmin
    });

    await user.save(function(err) {
        if (err) throw err;

        res.header('x-auth-token', user.generateAuthToken()).send({
            _id: user._id,
            username: user.username,
            isAdmin: user.isAdmin
        });
    });
});

module.exports = router;