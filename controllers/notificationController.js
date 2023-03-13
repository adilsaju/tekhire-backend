// const Job = require('../models/JobModel.js');
const express = require('express');
const job = require('../models/jobModel')
const employer = require('../models/employerModel')
const technician = require('../models/technicianModel');
const notification = require('../models/notificationModel');

const offer = require('../models/offerModel')
const socketServer = require('../socket2/socket-server');

const app = express();
const router = express.Router();

const postTechNotificationById = async (req, res, next) => {

    console.log('postTechNotificationById()');
  
    console.log(req.body);
    console.log(req.params.id);

    const particularTech =
    await technician.technicianModel.findById(
      req.params.id
    );
    try {
      //create obj
      const nObj = {
        heading: req.body.heading,
        text: req.body.text,
        user_id: particularTech,
        docModel: "technician"
        // picture: tricky
      };
  
      //update in db
      const nObj1 = await notification.notificationModel.create(
        nObj
      );
      // console.log('request1:', request1);
  
      res.json(nObj1);
      return
    } catch (error) {
      res.json({
        error: true,
        message: error.message
      });
      return
    }
  };
  
  const getTechNotificationById = async (req, res, next) => {

    console.log('getTechNotificationById()');
  
    // console.log(req.body);
    console.log(req.params.id);

    const particularTech =
    await technician.technicianModel.findById(
      req.params.id
    );
    try {
        console.log("h1");
        console.log("h2");


      const nObj1 = await notification.notificationModel.find(
        { "user_id":  req.params.id }
      )
    //   .populate("user_id");
      console.log("h3");

      // console.log('request1:', request1);
  
      res.json(nObj1);
      return
    } catch (error) {
      res.json({
        error: true,
        message: error.message
      });
      return
    }
  };



  const postEmpNotificationById = async (req, res, next) => {

    console.log('postTechNotificationById()');
  
    console.log(req.body);
    console.log(req.params.id);

    const particularTech =
    await employer.employerModel.findById(
      req.params.id
    );
    try {
      //create obj
      const nObj = {
        heading: req.body.heading,
        text: req.body.text,
        user_id: particularTech,
        docModel: "employer"
        // picture: tricky
      };
  
      //update in db
      const nObj1 = await notification.notificationModel.create(
        nObj
      );
      // console.log('request1:', request1);
  
      res.json(nObj1);
      return
    } catch (error) {
      res.json({
        error: true,
        message: error.message
      });
      return
    }
  };
  
  const getEmpNotificationById = async (req, res, next) => {

    console.log('getTechNotificationById()');
  
    // console.log(req.body);
    console.log(req.params.id);

    const particularTech =
    await employer.employerModel.findById(
      req.params.id
    );
    try {
        console.log("h1");
        console.log("h2");


      const nObj1 = await notification.notificationModel.find(
        { "user_id":  req.params.id }
      )
    //   .populate("user_id");
      console.log("h3");

      // console.log('request1:', request1);
  
      res.json(nObj1);
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
    getTechNotificationById,
    postTechNotificationById,
    getEmpNotificationById,
    postEmpNotificationById
}