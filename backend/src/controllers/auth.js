const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/user.js');
const express = require('express');

const controller = express.Router();

const register = async (req, res) => {
    try {
        const { fullname, username, password, role } = req.body;

        if (!(fullname && username && password)) {
            res.status(400).send('All input is required');
        }

        const oldUser = await User.findOne({ username });

        if (oldUser) {
            return res.status(409).send('User Already Exist. Please Login');
        }

        const encryptedUserPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullname,
            username,
            password: encryptedUserPassword,
            role
        });

        const token = jwt.sign(
            { id: user._id, username, role },
            'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1MzczMzIzMiwiaWF0IjoxNjUzNzMzMjMyfQ.hWeyBordvDqwpZNdFA3WP37Kr8HSJs7P8fRB2LUy2mk',
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
        const { username, password } = req.body;

        if (!(username && password)) {
            res.status(400).send('All input is required!');
        }

        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { id: user._id, username, role: user.role },
                'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1MzczMzIzMiwiaWF0IjoxNjUzNzMzMjMyfQ.hWeyBordvDqwpZNdFA3WP37Kr8HSJs7P8fRB2LUy2mk',
                {
                    expiresIn: 5 * 60
                }
            );
            user.token = token;

            return res.status(200).json(user);
        }
        return res.status(400).send('Invalid Credentials');
    } catch (err) {
        console.log(err);
    }
};

controller.post('/register', register);
controller.post('/login', login);

module.exports = controller;