// const Job = require('../models/JobModel.js');
const express = require('express');
const job = require('../models/jobModel')
const employer = require('../models/employerModel')
const technician = require('../models/technicianModel');
const offer = require('../models/offerModel')
const chat = require('../models/chatModel')


const getAllJobs = async (req, res, next) => {

    console.log('getAllJobs()');
    try {
      let respone = null;
      if (req.params.id) {
        respone = await job.jobModel.findById(req.params.id);
  
      } else {
        respone = await job.jobModel.find();
      }
      res.json(respone);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };
  
  const getJobsByEmployerId =  async(req,res,next) =>{
  
    console.log('getJobsByEmployerId()');
    
    try {
      const employerId = req.params.id;
      console.log("employerId", employerId)
      if (
        employerId === null ||
        employerId === undefined ||
        employerId === ''
      ) {
        res
          .status(500)
          .json({
            message: 'no employer ID found'
          });
  
        return;
      }
  
      const abc = await job.jobModel.find({
        'employer': employerId,
      }).populate("employer");
  
      res.json(abc);
    } catch (error) {
      res
        .status(500)
        .json({
          error: true,
          message: error.message
        });
    }
  }
  
  const postJob = async (req, res, next) => {
  
    console.log('postJob()');
  
    console.log(req.body);
    // {
    //   employerId: dmksadmlkd
    // }
  
    const particularEmployer =
      await employer.employerModel.findById(
        req.body.client_id
      );
    try {
      //create obj
      const jobObj = {
        employer: particularEmployer,
        title: req.body.title,
        description: req.body.description,
        skills_required: req.body.skills_required,
        location: req.body.location,
        max_cost:req.body.max_cost,
        prefer_start_date: req.body.prefer_start_date
      };
      //update in db
      const job1 = await job.jobModel.create(
        jobObj
      );
      // console.log('request1:', request1);
  
      res.json(job1);
      return
    } catch (error) {
      res.json({
        error: true,
        message: error.message
      });
      return
    }
  };
  const editJob = async (req, res, next) => {
    console.log('editJob()');
  
    console.log(req.body);
    // {
    //   employerId: dmksadmlkd
    // }
  
    // const pjob =
    //   await job.jobModel.findById(
    //     req.params.id
    //   );
    const jobId = req.params.id;


      const pemp =
      await employer.employerModel.findById(
        req.body.employer
      );
    try {
      //create obj
      const jobObj = {
        employer: pemp,
        title: req.body.title,
        description: req.body.description,
        skills_required: req.body.skills_required,
        location: req.body.location,
        max_cost:req.body.max_cost,
        prefer_start_date: req.body.prefer_start_date
      };
      //update in db
        const job1 = await Job.updateOne({ _id: jobId }, jobObj);
  
        res.json(job1);
      return
    } catch (error) {
      res.json({
        error: true,
        message: error.message
      });
      return
    }
  };
  const updateJobImages = async (req, res, next) => {
    console.log('updateJobImages()');
    console.log(req.params.id);
  
    const files = req.files
    if (!files) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
  
    const jobP =
      await job.jobModel.findById(
        req.params.id
      );
  
    jobP.images =  []
  
    try {
      //create obj
      for (let i =0; i< req.files.length; i++)
      {
        jobP.images.push(req.files[i].location);
      }
  
      //update in db
      await jobP.save()
  
  
      res.json(jobP);
      return
    } catch (error) {
      res.json({
        error: true,
        message: error.message
      });
      return
    }
  }


  module.exports = {
    getJobsByEmployerId,
    getAllJobs,
    postJob,
    updateJobImages,
    editJob
  }