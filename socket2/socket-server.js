const socketio = require('socket.io');
//
const job = require('../models/jobModel')
const employer = require('../models/employerModel')
const technician = require('../models/technicianModel');
const offer = require('../models/offerModel')
const chat = require('../models/chatModel')


let io;

function init(server) {
  console.log("sock init");
  io = socketio(server,{
    cors: {
        origin: ["http://127.0.0.1:5500"],
    }});

  io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", async (data) => {
      //ADD TO DATABASE LOGIC
      // room: "321",
      // sender: tech_id,
      // sender_type:"technician", //or employer
      // job: propValue,
      // message: tomessage,
      // id: Date.now()


  const   proom =      
    await chat.roomModel.findById(
      data.room_id
    );

    const   psender =    data.sender_type === "technician" ?  await technician.technicianModel.findById(
      data.sender
    ): await employer.employerModel.findById(
      data.sender
    )
      //create message api 
      const m1 = {
        id: data.id,
        room_id: proom,
        sender_id: psender,
        docModel: data.sender_type,
        message: data.message
       };


       console.log("roomiee");
       console.log(m1);

       //update in db
       const messageDb = await chat.messageModel.create(
        m1
      );

      console.log("sucesssss", messageDb);


      //get all now
      // respone = await chat.messageModel.find();


      // console.log(respone);
      //create message api 
      const m2 = {
        id: data.id,
        room_id: data.room_id,
        sender_id: data.sender,
        docModel: data.sender_type,
        message: data.message
       };
      socket.to(data.room).emit("receive_message", m2);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
}

module.exports = {
  init,
  getIO,
};
