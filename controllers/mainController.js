// const Job = require('../models/JobModel.js');
const express = require('express');
const job = require('../models/jobModel')
const employer = require('../models/employerModel')
const technician = require('../models/technicianModel');
const offer = require('../models/offerModel')




const app = express();
const router = express.Router();


const login = async (req, res, next) => {
    console.log("login");
    
    // res.json("login")
    console.log("success");
    res.json("success")
    
};

    const getAllJobs = async (req, res, next) => {

      console.log('getAllJobs()');
      try {
        let respone = null;
        if(req.params.id){
           respone = await job.jobModel.findById(req.params.id);
          
        }else{
           respone = await job.jobModel.find();
        }
        res.json(respone);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };

    const postJob = async (req, res, next) => {

      console.log('postJob()');

      console.log(req.body);
      // {
      //   employerId: dmksadmlkd
      // }

      const particularEmployer =
      await employer.employerModel.findById(
        req.body.employerId
      );
       try {
            //create obj
            const jobObj = {
              // employer: particularEmployer,
              title: req.body.title,
              description: req.body.description,
              // status: 
              skills_required: req.body.skills_required,
              location: req.body.location,
              // prefer_start_date: req.body.prefer_start_date
            };
            //update in db
            const job1 = await job.jobModel.create(
              jobObj
            );
            // console.log('request1:', request1);
      
            res.json(job1);
            return
          } catch (error) {
            res.json({ error: true, message: error.message });
            return
          }
    };


  const getAllTechnicians = async (req, res, next) => {

      console.log('getAllTechnicians()');
      try {
        // const abc = await Job.jobModel.find();
        const abc = await technician.technicianModel.find();

        res.json(abc);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  
  const getAllEmployers = async (req, res, next) => {

      console.log('getAllEmployers()');
      try {
        // const abc = await Job.jobModel.find();
        const abc = await employer.employerModel.find();
        res.json(abc);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };

    const getAllOffers = async (req, res, next) => {
      
      console.log('getAllOffers()');
      try {
        // const abc = await Job.jobModel.find();
        const abc = await offer.offerModel.find();
        res.json(abc);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };

    const getOfferById = async (req, res, next) => {

      console.log('getOfferbyId()');
      try {
        // const abc = await Job.jobModel.find();
        const abc = await offer.offerModel.findById(req.params.id);
        res.json(abc);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  
    const getOfferByJobId = async (req, res, next) => {

      console.log('getOfferByJobId()');

      try {
        const jobId = req.params.id;
        console.log("jobId",jobId)
        if (
          jobId === null ||
          jobId === undefined ||
          jobId === ''
        ) {
          res
            .status(500)
            .json({ message: 'no job ID found' });
  
          return;
        }
  
        const abc = await offer.offerModel.find({
          'jobID': jobId,
        }).sort({ offer_date: 1 });
  
        res.json(abc);
      } catch (error) {
        res
          .status(500)
          .json({ error: true, message: error.message });
      }
    };



module.exports = {
    login,
    getAllJobs,
    getAllTechnicians,
    getAllEmployers,
    getAllOffers,
    getOfferById,
    getOfferByJobId,
    postJob

}