const mongoose = require('mongoose');

const bnStudentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    caste: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    alt_contact: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    parent_name: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    rollNo: {
        type: String,
        required: true,
        unique: true
    },
});


module.exports = mongoose.model('bnadmit', bnStudentsSchema);