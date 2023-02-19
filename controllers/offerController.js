// const Job = require('../models/JobModel.js');
const express = require('express');
const job = require('../models/jobModel')
const employer = require('../models/employerModel')
const technician = require('../models/technicianModel');
const offer = require('../models/offerModel')
const socketServer = require('../socket2/socket-server');
const employment = require('../models/employmentModel')

const app = express();
const router = express.Router();


const getAllOffers = async (req, res, next) => {

    console.log('getAllOffers()');
    try {
      // const abc = await Job.jobModel.find();
      const abc = await offer.offerModel.find();
      res.json(abc);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  const getEmployment = async (req, res, next) => {

    console.log('getEmployment()');
    try {
      // const abc = await Job.jobModel.find();
      const abc = await employment.employmentModel.find();
      res.json(abc);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };
  
  const getOfferById = async (req, res, next) => {
  
    console.log('getOfferbyId()');
    try {
      // const abc = await Job.jobModel.find();
      const abc = await offer.offerModel.findById(req.params.id);
      res.json(abc);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };
  
  const getOfferByJobId = async (req, res, next) => {
  
    console.log('getOfferByJobId()');
  
    try {
      const jobId = req.params.id;
      console.log("jobId", jobId)
      if (
        jobId === null ||
        jobId === undefined ||
        jobId === ''
      ) {
        res
          .status(500)
          .json({
            message: 'no job ID found'
          });
  
        return;
      }
  
      const abc = await offer.offerModel.find({
        'jobID': jobId,
      }).sort({
        offer_date: 1
      });
  
      res.json(abc);
    } catch (error) {
      res
        .status(500)
        .json({
          error: true,
          message: error.message
        });
    }
  };

  
const createOffer = async (req, res, next) => {

  console.log('createOffer()');

  console.log(req.body);


  const particularTechnician =
    await technician.technicianModel.findById(
      req.body.technicianId
    );
    const particularJob =
    await job.jobModel.findById(
      req.body.jobID
    );
  try {

    const offerObj = {
 
     jobID: particularJob,
      offerPrice:req.body.offerPrice,
      offerHours:req.body.offerHours,
     technician_who_offered:particularTechnician,
      prefer_start_date:req.body.prefer_start_date

    };
    //update in db
    const offer1 = await offer.offerModel.create(
      offerObj
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


const acceptoffer = async (req, res, next) => {

  console.log('acceptoffer()');

  console.log(req.body);


  const particularOffer =
    await offer.offerModel.findById(
      req.body.offer_id
    );
  const particularJob = 
      await job.jobModel.findById(
        particularOffer.jobID
      )
    
// return
    
 if (!particularOffer.isAccepted){
  try {

    const employmentObj = {
        offer_id:particularOffer,
        start_date:particularOffer.prefer_start_date,
       
    };
    //update in db
    const offer1 = await employment.employmentModel.create(
      employmentObj
    );

    const upd = await offer.offerModel.updateOne(
      { _id: req.body.offer_id },
      { $set: { isAccepted: true } }
   )
   const upd2 = await job.jobModel.updateOne(
    { _id: particularJob._id },
    { $set: { status: 1 } }
 )
   console.log("pppppp",particularJob._id)
   console.log(particularOffer)

    res.json(offer1);

    
    return
  } catch (error) {
    res.json({
      error: true,
      message: error.message
    });
    return
  }
  

 }else{
  console.log(particularOffer.isAccepted)
  res.json("already accepted");
  return
  
}
};

  

module.exports = {
    getAllOffers,
    getOfferById,
    getOfferByJobId,
    getEmployment,
    createOffer,
    acceptoffer
}