const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  name: {
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
  address: {
    type: String,
    required: true
  },
  parent_name: {
    type: String,
    required: true
  },
  DOB: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  percentage_in_degree: {
    type: String,
    required: true
  },
  caste: {
    type: String,
    required: true
  },
  createdDate: {
    type: String
  }
});


module.exports = mongoose.model('User', userSchema);