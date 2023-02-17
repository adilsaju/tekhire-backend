const mongoose = require('mongoose')

const Schema = mongoose.Schema

const attendanceSchema = new mongoose.Schema({

   employment_id: {
    type: Schema.Types.ObjectId,
    ref: "employment"
   },
   clock_in:{
    type: Date,
    default: Date.now
   },
   clock_out:{
    type:Date,
    default: Date.now
   },
   shift_date:{
    type:Date,
    default: Date.now
   }
   
   
})

module.exports = {
    attendanceSchema,
   employmentModel: mongoose.model('attendance', attendanceSchema, 'attendance'),
}