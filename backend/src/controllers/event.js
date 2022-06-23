const { Event, toEventDTO } = require('../model/event.js');
const express = require('express');

const controller = express.Router();

const getAll = async (req, res) => {
    try {
        const events = await Event.find();
        const dtos = events.map((e) => toEventDTO(e));
        return res.status(200).json(dtos);
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

const get = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findOne({ id: eventId });
        return res.status(200).json(toEventDTO(event));
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

const create = async (req, res) => {
    try {
        const { id, title, description, startDate } = req.body;
        const date = new Date(startDate);
        const event = await Event.create({
            id,
            title,
            description,
            startDate: date
        });
        return res.status(200).json(toEventDTO(event));
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

const register = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.auth.id;

        const updated = await Event.findOneAndUpdate(
            { id: eventId },
            { $addToSet: { registeredUsers: userId } },
            { new: true }
        );

        return res.status(200).json(toEventDTO(updated));
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};

const unregister = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.auth.id;

        const updated = await Event.findOneAndUpdate(
            { id: eventId },
            { $pull: { registeredUsers: userId } },
            { new: true }
        );

        return res.status(200).json(toEventDTO(updated));
    } catch (err) {
        console.log(err);
        return res.status(502).json({ message: 'some shit on our side' });
    }
};
controller.get('/:eventId', get);
controller.get('/', getAll);
controller.post('/', create);
controller.post('/:eventId/register', register);
controller.delete('/:eventId/register', unregister);

module.exports = controller;
