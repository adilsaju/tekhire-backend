const express = require('express');
const job = require('../models/jobModel')
const employer = require('../models/employerModel')
const technician = require('../models/technicianModel');
const offer = require('../models/offerModel')
const socketServer = require('../socket2/socket-server');
const employment = require('../models/employmentModel')
const attendance = require('../models/attendanceModel')

const app = express();
const router = express.Router();

const date = new Date();
const date_diff = 0;


const getAttendance = async (req, res, next) => {

    console.log('getAttendance()');
    try {
      
        respone = await attendance.attendanceModel.find(); 
        res.json(respone);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

const clockIn = async (req, res, next) => {

    console.log('clockIn()');
  
    console.log(req.body);
  
  
    const particularempnt =
      await employment.employmentModel.findById(
        req.body.employment_id
      );
     
    try {
  
      const attendanceObj = {
       employment: particularempnt,
       clock_out:null
      };
      //update in db
      const offer1 = await attendance.attendanceModel.create(
        attendanceObj
      );
        
      
  
      res.json(offer1);
      return
    } catch (error) {
      res.json({
        error: true,
        message: error.message
      });
      return
    }
  };
  const clockOut = async (req, res, next) => {

    console.log('clockOut()');
  
    console.log(req.body);
  
  
    const particularempnt =
      await employment.employmentModel.findById(
        req.body.employment_id
      );
    
    try {
  
      
      //update in db
      const offer1 = await attendance.attendanceModel.updateOne(
       
       {employment: particularempnt._id,clock_out:null },
        { $set: { clock_out: date,shift_duration:date_diff } }
      )
  
      
      res.json(particularempnt);
      return
    } catch (error) {
      res.json({
        error: true,
        message: error.message
      });
      return
    }
  };
  
  
module.exports = {
    clockIn,
    clockOut,
    getAttendance
}