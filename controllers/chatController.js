// const Job = require('../models/JobModel.js');
const express = require('express');
const job = require('../models/jobModel')
const employer = require('../models/employerModel')
const technician = require('../models/technicianModel');
const offer = require('../models/offerModel')
const chat = require('../models/chatModel')


const chat1 = async (req, res, next) => {
    try {
      const {
        message
      } = req.body;
      // console.log(message);
  
      // Send the message to all connected clients
      socketServer.getIO().emit('connection', message);
  
      res.json({
        success: true
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }

  const createRoom = async (req,res,next) => {
    //create room
  // createRoom()
  const pemp =
  await employer.employerModel.findById(
    req.body.employer
  );
  const ptech =
  await technician.technicianModel.findById(
    req.body.technician
  );
  const pjob =
  await job.jobModel.findById(
    req.body.job
  );
  console.log("gaaaaanddddddddddd");
  console.log(pemp,ptech,pjob);

  const room1 = {
    room: "321",
    employer_id: pemp,
    technician_id: ptech,
    job_id: pjob,
    // room_created: Date.now
   };
   console.log("roomiee");
   console.log(room1);

   //update in db
   const roomDb = await chat.roomModel.create(
    room1
  );
   res.json(roomDb);
}

const deleteRoom = async (req,res,next) => {

//deleteee
const roomDb = await chat.roomModel.deleteOne( {"_id": ObjectId(req.params.id)})
res.json("success");
}

const getAllRooms = async (req,res,next) => {

console.log('getAllRooms()');
try {
let respone = null;
if (req.params.id) {
  respone = await chat.roomModel.findById(req.params.id);

} else {
  respone = await chat.roomModel.find();
}
res.json(respone);
} catch (error) {
res.status(500).json({
  message: error.message
});
}

}

const getAllMessages = async (req,res,next) => {

console.log('getAllMessages()');
try {
let respone = null;
if (req.params.id) {
  respone = await chat.messageModel.findById(req.params.id);

} else {
  respone = await chat.messageModel.find();
}
res.json(respone);
} catch (error) {
res.status(500).json({
  message: error.message
});
}

}


module.exports = {


  createRoom,
deleteRoom,

getAllRooms,
getAllMessages,

}