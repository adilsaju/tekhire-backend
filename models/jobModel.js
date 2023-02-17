const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
   // firebase_uid: String,
   name: {
      type: String,
      required: true
   },
   date: {
    type: Date,
    required: true,
    default: Date.now
   }
})
// studentSchema.index({ 'email' : 1 }, { unique: true });


module.exports = {
    jobSchema: jobSchema,
   jobModel: mongoose.model('job', jobSchema, 'job'),
}