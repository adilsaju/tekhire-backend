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
    default: "started"
   }
   
   
})
// studentSchema.index({ 'email' : 1 }, { unique: true });


module.exports = {
    employmentSchema,
   employmentModel: mongoose.model('employment', employmentSchema, 'employment'),
}