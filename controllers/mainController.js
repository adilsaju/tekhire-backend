// const Job = require('../models/JobModel.js');
const express = require('express');
const job = require('../models/jobModel')
const employer = require('../models/employerModel')
const technician = require('../models/technicianModel')


const app = express();
const router = express.Router();


const login = async (req, res, next) => {
    console.log("login");
    // res.json("login")
    console.log("success");
    res.json("success")
    // console.log('getAllJobs()');
    //   try {
    //     const respone = await job.jobModel.find();
    //     res.json(respone);
    //   } catch (error) {
    //     res.status(500).json({ message: error.message });
    //   }
};

const getAllJobs = async (req, res, next) => {

      console.log('getAllJobs()');
      try {
        const respone = await job.jobModel.find();
        res.json(respone);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };


  const getAllTechnicians = async (req, res, next) => {

      console.log('getAllJobs()');
      try {
        // const abc = await Job.jobModel.find();
        const abc = await technician.technicianModel.find();

        res.json(abc);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  



  const getAllEmployers = async (req, res, next) => {

      console.log('getAllJobs()');
      try {
        // const abc = await Job.jobModel.find();
        const abc = await employer.employerModel.find();
        res.json(abc);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  



module.exports = {
    login,
    getAllJobs,
    getAllTechnicians,getAllEmployers

}