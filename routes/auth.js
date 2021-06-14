const User = require('../models/User');

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {validationRegister, loginValidation} = require('../validation');

router.get('/', async (req, res) => {
    try {
        const data = await User.find();
        res.json(data);
    } catch (err) {
        res.json({msg: err});
    }
})

router.post('/register', async (req, res) => {
    const { error } = validationRegister(req.body);
    if ( error ){
        return res.status(400).send(error.details[0].message);
    }
    const emailIsExist = await User.findOne({email: req.body.email});
    if (emailIsExist) {
        return res.status(400).send('Email already exist');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const entityUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        })
        const registeredUser = await entityUser.save();
        res.json({user: entityUser._id});
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/login', async (req, res) => {
    const { err } = loginValidation(req.body);
    if (err) {
        return res.status(400).send(err.details[0].message);
    }
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).send('Email or password wrong');
    }
    try {
        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        if (!validatePassword){
            return res.status(400).send('Email or password wrong');
        }
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
    } catch (err) {
        res.json(err);
    }
})



module.exports = router;