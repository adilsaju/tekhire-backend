// const Job = require('../models/JobModel.js');
const express = require('express');
const job = require('../models/jobModel')
const employer = require('../models/employerModel')
const technician = require('../models/technicianModel');
const offer = require('../models/offerModel')
const socketServer = require('../socket2/socket-server');

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



module.exports = {
    getAllOffers,
    getOfferById,
    getOfferByJobId,
}