const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, toUserDTO } = require('../model/user.js');
const express = require('express');

const controller = express.Router();

const register = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            nickname,
            password,
            role,
            secret,
            avatar
        } = req.body;

        if (!(firstname && lastname && nickname && password && avatar)) {
            console.log(firstname, lastname, nickname, password, avatar);
            return res.status(400).json({ message: 'All input is required' });
        }

        const oldUser = await User.findOne({ nickname });

        if (oldUser) {
            return res
                .status(409)
                .json({ message: 'User Already Exist. Please Login' });
        }

        if (role === 'mentor' && secret !== process.env.MENTOR_SECRET) {
            return res.status(400).json({ message: 'Invalid Mentor Secret!' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        var avatarBuffer = new Buffer.from(avatar.split(',')[1], 'base64');

        const user = await User.create({
            firstname,
            lastname,
            nickname,
            password: encryptedPassword,
            role,
            avatar: avatarBuffer
        });

        const token = jwt.sign(
            { id: user._id, nickname, role },
            process.env.TOKEN_KEY,
            {
                expiresIn: 5 * 60 * 60
            }
        );

        const userWithToken = await User.findOneAndUpdate(
            { id: user._id },
            { token },
            { new: true }
        );

        res.status(201).json(toUserDTO(userWithToken));
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

        console.log('loginGetUser', user);

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { id: user._id, nickname, role: user.role },
                process.env.TOKEN_KEY,
                {
                    expiresIn: 5 * 60 * 60
                }
            );

            const updated = await User.findOneAndUpdate(
                { _id: user._id },
                { token },
                { new: true }
            );

            return res.status(200).json(toUserDTO(updated));
        } else {
            return res.status(400).json({ message: 'Invalid Credentials!' });
        }
    } catch (err) {
        console.log(err);
    }
};

controller.post('/register', register);
controller.post('/login', login);

module.exports = controller;
