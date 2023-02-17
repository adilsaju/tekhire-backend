const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
   //  firebase_uid: String,
    name: {
       type: String,
       required: true
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
       required: true
    },
    picture: {
      type: String,
      default: "https://storage.googleapis.com/yoke-e05d7.appspot.com/yoke%2F%2Faccount184822ff688.svg",
      required: true
   },
   phone: {
      type: String,
      required: true
   },
    id: {
      type: String,
      required: true
   },
   dateJoined: {
      type: Date,
      default: Date.now
   },
 })

//  adminSchema.index({ 'email' : 1 }, { unique: true });


 module.exports = {
   adminSchema: adminSchema,
   adminModel: mongoose.model('admin', adminSchema, 'admin'),
 }
 