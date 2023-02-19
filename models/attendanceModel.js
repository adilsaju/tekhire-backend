const mongoose = require('mongoose')

const Schema = mongoose.Schema

const attendanceSchema = new mongoose.Schema({

   employment: {
    type: Schema.Types.ObjectId,
    ref: "employment"
   },
   clock_in:{
    type: Date,
    default: Date.now
   },
   clock_out:{
    type:Date,
    default:null
   //  default: Date.now
   },
   shift_date:{
    type:Date,
    default: Date.now
   },
   shift_duration:{
      type:Number,
      default:0
   }
   
   
})

module.exports = {
    attendanceSchema,
   attendanceModel: mongoose.model('attendance', attendanceSchema, 'attendance'),
}