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


// userSchema.pre('save', function (next) {
//   // Trim and lowercase email
//   if (this.email) {
//     this.email = this.email.trim().toLowerCase();
//   }

//   if (this.DOB) {
//     let cleaned = this.DOB.trim().replace(/[-]/g, '/'); // Normalize to `/` separators
//     const parts = cleaned.split('/');

//     if (parts.length === 3) {
//       let [month, day, year] = parts;

//       // Pad day and month to 2 digits
//       day = day.padStart(2, '0');
//       month = month.padStart(2, '0');

//       this.password = `${day}${month}${year}`; // e.g., 01/01/1996 => 01011996
//     }
//   }

//   next();
// });

module.exports = mongoose.model('User', userSchema);