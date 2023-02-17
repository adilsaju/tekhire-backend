const mongoose = require('mongoose')

const technicianNotificationSchema = new mongoose.Schema({
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

   pubs: {
      type: [Schema.Types.ObjectId],
      ref: "technician"
   }
})
technicianNotificationSchema.index({ 'email' : 1 }, { unique: true });


module.exports = {
   technicianNotificationSchema,
   technicianNotificationModel: mongoose.model('technician', technicianNotificationSchema, 'technician'),
}