const mongoose = require('mongoose')
const employerModel = require('./employerModel').employerModel
const employerSchema = require('./employerModel').employerSchema
const Schema = mongoose.Schema

const jobSchema = new mongoose.Schema({
   // firebase_uid: String,
   title: {
      type: String,
      
   },
   posted_date: {
    type: Date,
   required: true,
    default: Date.now
   },
   description: {
      type: String,
   },
   max_cost:{
      type:Number,
      required:true,
      default:0
   },
   status:{
      type: String,
     required:true,
      default: "new job"
   },
   picture: {
      type: String,
      default: "https://storage.googleapis.com/yoke-e05d7.appspot.com/yoke%2F%2Faccount184822ff688.svg"
   },
   skills_required: {
      type: [String]
   },
   location: {
      type: String,
   //   required: true
   },
   employer: {
      type: Schema.Types.ObjectId,
      ref: "employer"

   },
   technician:{
      type: Schema.Types.ObjectId,
      ref: "technician"
   },
   prefer_start_date:{
      type:Date,
       default: Date.now

      // required:true
   }
   
})
// studentSchema.index({ 'email' : 1 }, { unique: true });


module.exports = {
    jobSchema,
   jobModel: mongoose.model('job', jobSchema, 'job'),
}