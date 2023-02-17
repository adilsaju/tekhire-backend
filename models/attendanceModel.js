const mongoose = require('mongoose')

const Schema = mongoose.Schema

const attendanceSchema = new mongoose.Schema({

   employment_id: {
    type: Schema.Types.ObjectId,
    ref: "employment"
   },
   clock_in:{
    type: Date,
   },
   clock_out:{
    type:Date
   },
   shift_date:{
    type:Date
   }
   
   
})

module.exports = {
    attendanceSchema,
   employmentModel: mongoose.model('attendance', attendanceSchema, 'attendance'),
}