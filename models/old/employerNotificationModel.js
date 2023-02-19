const mongoose = require('mongoose')

const employerNotificationSchema = new mongoose.Schema({
   // firebase_uid: String,
   heading: {
      type: String,
      required: true
   },

   text: {
      type: String,
      required: true
   },
 
   date: {
      type: Date,
      default: Date.now
   },
   subs: {
      type: String,
   },

   user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      // ref: "employer",
      refPath: 'docModel'
   },
   docModel: {
      type: String,
      required: true,
      enum: ['employer', 'technician']
    }
})
employerNotificationSchema.index({ 'email' : 1 }, { unique: true });


module.exports = {
   employerNotificationSchema,
   employerNotificationModel: mongoose.model('technician', employerNotificationSchema, 'technician'),
}