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

// ROOM
// =================
// id
// employer_id
// technician_id
// jobid
// chat_initiator_id
// room_created


//MESSAGE
// id
// chatroom_id
// sender_id
//time

// APIS
// ================
// getAllRooms()
// getAllRoomsOfLoggedInTechnician(id)
// getAllRoomsOfLoggedInEmployer(id)
// createRoom()
// deleteRoom()


const mongoose = require('mongoose')
const employerModel = require('./employerModel').employerModel
const employerSchema = require('./employerModel').employerSchema
const Schema = mongoose.Schema

const roomSchema = new mongoose.Schema({

    room: {
        type: String,
        required: true
    },
    // or reference
    employer_id: {
        type: Schema.Types.ObjectId,
        ref: "employer"
    },
    // or reference
    technician_id: {
        type: Schema.Types.ObjectId,
        ref: "technician"
    },
    //of reference
    job_id: {
        type: Schema.Types.ObjectId,
        ref: "job"
    },
    room_created: {
        type: Date,
        default: Date.now
    }

   
})

const messageSchema = new mongoose.Schema({
    id: {
        type: Date,
        required: true,
        default: Date.now
    },
    // Foreign key
    room_id: {
        type: Schema.Types.ObjectId,
        ref: "room"
    },
    // or reference
    sender_id: {
        type: Schema.Types.ObjectId,
        // ref: "technician" || "employer"
        refPath: 'docModel'

    },
     docModel: {
        type: String,
        required: true,
        enum: ['employer', 'technician']
      },
    // sender_type: {
    //     type: String,
    //     required: true
    // },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
   
})
module.exports = {
    roomSchema,
    roomModel: mongoose.model('room', roomSchema, 'room'),
    messageSchema,
    messageModel: mongoose.model('message', messageSchema, 'message'),
}