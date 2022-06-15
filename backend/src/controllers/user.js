const User = require('../model/user.js');
const express = require('express');

const controller = express.Router();

const profile = async (req, res) => {
    try {
        const nickname = req.auth.nickname;
        const user = await User.findOne({ nickname });

        if (user) {
            return res.status(201).json(user);
        } else {
            return res.status(404).send('User not found');
        }
    } catch (err) {
        console.log(err);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

const increaseUsersRaspberry = async (req, res) => {
    try {
        const { id } = req.body;

        const currentUser = await User.findOne({ _id: id });

        const updated = await User.findOneAndUpdate(
            { _id: id },
            { raspberries: currentUser.raspberries + 1 }
        );

        return res.status(200).json(updated);
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

controller.get('/profile', profile);
controller.get('/all', getAllUsers);
controller.post('/increaseCounter', increaseUsersRaspberry);

module.exports = controller;
