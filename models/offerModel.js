const mongoose = require('mongoose')
const technicianModel = require('./technicianModel').technicianModel
const technicianSchema = require('./technicianModel').technicianSchema
const Schema = mongoose.Schema

const offerSchema = new mongoose.Schema({

   jobID: {
      type: Schema.Types.ObjectId,
        ref: "job"
   },
   offerPrice:{
    type: Number,
    required:true
   },
   offerHours:{
    type: Number,
    required:true
   },
   offerStatus:{
    type:String,
    required:true,
    default: "pending"
   },
   technician_who_offered:{
    type: Schema.Types.ObjectId,
      ref: "technician"
   },
   prefer_start_date:{
      type:Date,
      required:true,
      default:Date.now
   },
   offer_date:{
      type:Date,
      required:true,
      default:Date.now
   }

   
})


module.exports = {
    offerSchema,
   offerModel: mongoose.model('offer', offerSchema, 'offer'),
}