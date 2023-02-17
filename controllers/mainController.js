// const Job = require('../models/JobModel.js');
const express = require('express');
const job = require('../models/jobModel')

const app = express();
const router = express.Router();

const createAdmin = async (req, res, next) => {
    console.log("success");
    res.json("success")
};

const login = async (req, res, next) => {
    console.log("login");
    // res.json("login")

    console.log('getAllJobs()');
      try {
        const respone = await job.jobModel.find();
        res.json(respone);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

const getAllJobs = () => {
    return async (req, res, next) => {

      console.log('getAllJobs()');
      try {
        // const abc = await Job.jobModel.find();
        res.json('abc');
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  };


module.exports = {
    createAdmin,
    login,
    getAllJobs

}