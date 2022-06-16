const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/user.js');
const express = require('express');

const controller = express.Router();

const register = async (req, res) => {
    try {
        const { firstname, lastname, nickname, password, role, secret } =
            req.body;

        if (!(firstname && lastname && nickname && password)) {
            res.status(400).json({ message: 'All input is required' });
        }

        const oldUser = await User.findOne({ nickname });

        if (oldUser) {
            return res
                .status(409)
                .json({ message: 'User Already Exist. Please Login' });
        }

        if (!(role === 'mentor' && secret === process.env.MENTOR_SECRET)) {
            return res.status(400).json({ message: 'Invalid Mentor Secret!' });
        }

        const encryptedUserPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstname,
            lastname,
            nickname,
            password: encryptedUserPassword,
            role
        });

        const token = jwt.sign(
            { id: user._id, nickname, role },
            process.env.TOKEN_KEY,
            {
                expiresIn: 5 * 60 * 60
            }
        );

        user.token = token;
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
};

const login = async (req, res) => {
    try {
        const { nickname, password } = req.body;

        if (!(nickname && password)) {
            res.status(400).json({ message: 'All input is required' });
        }

        const user = await User.findOne({ nickname });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { id: user._id, nickname, role: user.role },
                process.env.TOKEN_KEY,
                {
                    expiresIn: 5 * 60 * 60
                }
            );
            user.token = token;

            return res.status(200).json(user);
        }
        return res.status(400).json({ message: 'Invalid Credentials!' });
    } catch (err) {
        console.log(err);
    }
};

controller.post('/register', register);
controller.post('/login', login);

module.exports = controller;
