const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employmentSchema = new mongoose.Schema({
   offer_id: {
      type: Schema.Types.ObjectId,
      ref: "offer"
     },
   total_hours:{
    type: Number,
    required:true,
    default:0
   },
   total_income:{
      type:Number,
      required:true,
      default:0
   },
   start_date:{
    type:Date,
   },
   end_date:{
    type:Date,
    default: null
   },
   employment_status:{
    type: String,
    default: "upcoming"
   },
   technician_accepted:{
      type: Schema.Types.ObjectId,
      ref: "technician"
   },
   job:{
      type: Schema.Types.ObjectId,
      ref: "job"
   },
   employer:{
      type: Schema.Types.ObjectId,
      ref: "employer"
   }
   
})
// studentSchema.index({ 'email' : 1 }, { unique: true });


module.exports = {
    employmentSchema,
   employmentModel: mongoose.model('employment', employmentSchema, 'employment'),
}