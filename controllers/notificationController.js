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


    const nObj1 = await notification.notificationModel.find({
      "user_id": req.params.id
    })
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


    const nObj1 = await notification.notificationModel.find({
      "user_id": req.params.id
    })
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

const postNotificationToAllTechnicians = async (req, res, next) => {

  console.log('postNotificationToAllTechnicians()');

  console.log(req.body);
  // console.log(req.params.id);
  // const particularTech =
  // await technician.technicianModel.findById(
  //   req.params.id
  // );
  const allTechs = await technician.technicianModel.find().lean();

  try {

    let ar1 = []
    for (let i = 0; i < allTechs.length; i++) {

      let particularTech =
        await technician.technicianModel.findById(
          allTechs[i]._id
        );

      //create obj
      let nObj = {
        heading: req.body.heading,
        text: req.body.text,
        docModel: "technician",
        user_id: particularTech,
        // picture: tricky
      };
      //update in db
      let nObj1 = await notification.notificationModel.create(
        nObj
      );

      ar1.push(nObj1)
    }

    res.json(ar1);
    return
  } catch (error) {
    res.json({
      error: true,
      message: error.message
    });
    return
  }
};

const deleteNotificationById = async (req, res, next) => {
  console.log('deleteNotificationById()');
  // console.log(req.body);
  const nId = req.params.id;

  try {
    const result = await notification.notificationModel.findByIdAndDelete(nId);
    if (!result) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTechNotificationById,
  postTechNotificationById,
  getEmpNotificationById,
  postEmpNotificationById,
  postNotificationToAllTechnicians,
  deleteNotificationById
}