const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const data = await User.find();
        res.json(data);
    } catch (err) {
        res.json({msg: err});
    }
})

router.post('/', async (req, res) => {
    const entityUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    })
    try {
        const createdUser = await entityUser.save();
        res.json(createdUser);
    } catch (err) {
        res.json({msg: err});
    }
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    if (userId) {
        try {
            const getUser = await User.findById(userId);
            res.json(getUser);
        } catch (err) {
            res.json({msg: err});
        }
    }
});

router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
    if (userId) {
        try {
            const removeUser = await User.remove({_id: userId});
            res.json(removeUser);
        } catch (err) {
            res.json(err);
        }
    }
});

router.patch('/:userId', async (req, res) => {
    const userId = req.params.userId;
    if (userId){
        try {
            const updatedPost = await User.updateOne({_id: userId}, {$set: {
                title: req.body.title,
                description: req.body.description,
            }});
            res.json(updatedPost);
        } catch (err) {
            res.json({msg: err});
        }
    }
})

module.exports = router;