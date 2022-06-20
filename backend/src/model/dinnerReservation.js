const mongoose = require('mongoose');
const { User } = require('./user.js').schema;



const dinnerReservationSchema = new mongoose.Schema({
    placeName: {
        type: String,
        required: true},
    info: {
        type: Map,
        of: new mongoose.Schema({
            address: {
                type: String,
                default: null
            },
            link: {
                type: String,
                default: null
            }
        })
    },
    users: {
        type: [User],
        default: []
    }
})

module.exports = mongoose.model('dinnerReservation', dinnerReservationSchema)