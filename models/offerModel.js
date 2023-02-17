const mongoose = require('mongoose')
const technicianModel = require('./technicianModel').technicianModel
const technicianSchema = require('./technicianModel').technicianSchema
const Schema = mongoose.Schema

const offerSchema = new mongoose.Schema({

   jobID: {
      type: String,
      required: true,
      
   },
   offerPrice:{
    type: Number,
    required:true
   },
   offerHours:{
    type: Number,
    required:true
   },
   isAccepted:{
    type:Boolean,
    required:true,
    default: false
   },
   technicianID:{
    type: Schema.Types.ObjectId,
      ref: "technician"
   },
   prefer_start_date:{
      type:Date,
      required:true
   }

   
})


module.exports = {
    offerSchema,
   offerModel: mongoose.model('offer', offerSchema, 'offer'),
}