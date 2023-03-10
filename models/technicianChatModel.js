// const messageData = {
//     room: "321",
//      job: propValue,
//     sender: tech_id,
//     sender_type:"technician", //or employer
//     message: tomessage,
//     id: Date.now()
// };

// {
//     room: '321',
//     sender: '63f17ce257353e03afc8f124',
//     message: 'Kooo',
//     id: 1678445792130
//   }

const mongoose = require('mongoose')
const employerModel = require('./employerModel').employerModel
const employerSchema = require('./employerModel').employerSchema
const Schema = mongoose.Schema

const technicianChatSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },

    //of reference
    job: {
        type: String,
        required: true
    },
    // or reference
    sender: {
        type: String,
        required: true
    },
    sender_type: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

    id: {
        type: Date,
        required: true,
        default: Date.now
    }
   
})


module.exports = {
    technicianChatSchema,
    technicianChatModel: mongoose.model('chat', technicianChatSchema, 'chat'),
}