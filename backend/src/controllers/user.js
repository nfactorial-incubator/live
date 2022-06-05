const User = require('../model/user.js');
const express = require('express');

const controller = express.Router();

const profile = async (req, res) => {
    try {
        const username = req.auth.username;
        const user = await User.findOne({ username });

        if (user) {
            return res.status(201).json(user);
        } else {
            return res.status(404).send('User not found');
        }
    } catch (err) {
        console.log(err);
    }
};

controller.get('/profile', profile);

module.exports = controller;
