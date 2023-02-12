const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
   firebase_uid: String,
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
   income: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      required: true
   },
   id: {
      type: Number,
      required: true
   },
   skills: {
      type: String,
      required: true
   },

   picture: {
      type: String,
      default: "https://storage.googleapis.com/yoke-e05d7.appspot.com/yoke%2F%2Faccount184822ff688.svg"
   },
   dateJoined: {
      type: Date,
      default: Date.now
   },
})
studentSchema.index({ 'email' : 1 }, { unique: true });


module.exports = {
   studentSchema: studentSchema,
   studentModel: mongoose.model('student', studentSchema, 'student'),
}