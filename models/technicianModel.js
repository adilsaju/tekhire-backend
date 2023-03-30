const mongoose = require('mongoose');

const technicianSchema = new mongoose.Schema({
  // firebase_uid: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    index: true,
  },
  password: {
    type: String,
  },
  company: {
    type: String,
  },
  experience: {
    type: Number,
  },
  income: {
    type: String,
    // required: true
    default: 0,
  },
  phone: {
    type: String,
    // required: true
  },
  license_id_something: {
    type: Number,
    // required: true
  },
  skills: {
    type: [String],
    // required: true
  },
  skill_certificates: {
    type: [String],
    // required: true
  },
  picture: {
    type: String,
    default: 'https://tekk-main.s3.us-west-2.amazonaws.com/1676798660245',
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  total_hours_worked: {
    type: Number,
    default: 0,
  },
  firebase_uid: {
    type: String,
    default: '',
  },
  google_uid: {
    type: String,
    default: '',
  },
  role_type: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: `Vancouver, BC
       V5H 2K9`,
  },
});
technicianSchema.index({ email: 1 }, { unique: true });

module.exports = {
  technicianSchema,
  technicianModel: mongoose.model('technician', technicianSchema, 'technician'),
};
