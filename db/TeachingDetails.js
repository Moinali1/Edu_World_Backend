const mongoose = require('mongoose');

const teachingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  resumeFile: {
    type: String,
    // required: true
  },
  address: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  }
});

const TeachingDetails = mongoose.model('teachingdetails', teachingSchema);

module.exports = TeachingDetails;


//test on postman
// requestBody: {
//   name: 'John Doe',
//   phone: '1234567890',
//   email: 'johndoe@example.com',
//   gender: 'Male',
//   resumeFile: 'Base64 encoded binary data here',
//   address: '123 Street, City',
//   question: 'Some explanation or description'
// }