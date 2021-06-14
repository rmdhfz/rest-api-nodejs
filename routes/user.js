const express = require('express'),
    router = express.Router(),
    User = require('../models/User'),
    bcrypt = require('bcryptjs'),
    verify = require('./verifyToken'),
    jwt = require('jsonwebtoken');

const {validationID} = require('../validation');

router.get('/', verify, async (req, res) => {
    try {
        const data = await User.find();
        res.json(data);
    } catch (err) {
        res.json({msg: err});
    }
})

router.post('/', verify, async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10), hashPassword = await bcrypt.hash(req.body.password, salt);
        const entityUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        })
        const createdUser = await entityUser.save();
        res.json(createdUser);
    } catch (err) {
        res.json({msg: err});
    }
});

router.get('/:userId', verify, async (req, res) => {
    const userId = req.params.userId;
    if (userId) {
        const { err } = validationID(userId);
        if ( err ){
            return res.status(400).send(error.details[0].message);
        }
        try {
            const getUser = await User.findById(userId);
            res.json(getUser);
        } catch (err) {
            res.json({msg: err});
        }
    }
});

router.delete('/:userId', verify, async (req, res) => {
    const userId = req.params.userId;
    if (userId) {
        const { err } = validationID(userId);
        if ( err ){
            return res.status(400).send(error.details[0].message);
        }
        try {
            const removeUser = await User.remove({_id: userId});
            res.json(removeUser);
        } catch (err) {
            res.json(err);
        }
    }
});

router.patch('/:userId', verify, async (req, res) => {
    const userId = req.params.userId;
    if (userId) {
        const { err } = validationID(userId);
        if ( err ){
            return res.status(400).send(error.details[0].message);
        }
        try {
            const salt = await bcrypt.genSalt(10), hashPassword = await bcrypt.hash(req.body.password, salt);
            const updatedPost = await User.updateOne({_id: userId}, {$set: {
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
            }});
            res.json(updatedPost);
        } catch (err) {
            res.json({msg: err});
        }
    }
})

module.exports = router;