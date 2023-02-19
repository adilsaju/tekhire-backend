const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new mongoose.Schema({
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
// notificationSchema.index({ 'email' : 1 }, { unique: true });


module.exports = {
   notificationSchema,
   notificationModel: mongoose.model('notification', notificationSchema, 'notification'),
}