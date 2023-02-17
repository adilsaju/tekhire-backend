const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employmentSchema = new mongoose.Schema({

   offer_id: {
      type: String,
      required: true,
   },
   total_hours:{
    type: Number,
    required:true,
    default:0
   },
   start_date:{
    type:Date
   },
   end_date:{
    type:Date
   },
   emplyment_status:{
    type: Number,
    default:0
   }
   
   
})
// studentSchema.index({ 'email' : 1 }, { unique: true });


module.exports = {
    employmentSchema,
   employmentModel: mongoose.model('employment', employmentSchema, 'employment'),
}