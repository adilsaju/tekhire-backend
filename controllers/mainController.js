// const Job = require('../models/JobModel.js');
const express = require('express');
const job = require('../models/jobModel')
const employer = require('../models/employerModel')
const technician = require('../models/technicianModel');
const offer = require('../models/offerModel')
const socketServer = require('../socket2/socket-server');

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
}

const postJob = async (req, res, next) => {

  console.log('postJob()');

  console.log(req.body);
  // {
  //   employerId: dmksadmlkd
  // }

  const particularEmployer =
    await employer.employerModel.findById(
      '63f1b9adcf55c1d5b65f58ad'
    );
  try {
    //create obj
    const jobObj = {
      employer: particularEmployer,
      title: req.body.title,
      description: req.body.description,
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
    res.json({
      error: true,
      message: error.message
    });
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
    res.status(500).json({
      message: error.message
    });
  }
};

const getAllEmployers = async (req, res, next) => {

  console.log('getAllEmployers()');
  try {
    // const abc = await Job.jobModel.find();
    const abc = await employer.employerModel.find();
    res.json(abc);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const createTechnician = async (req, res, next) => {

  console.log('createTechnician()');

  console.log(req.body);
  // {
  //   employerId: dmksadmlkd
  // }


  try {
    //create obj
    const technicianObj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.location,
      // picture: tricky
    };

    //update in db
    const technician1 = await technician.technicianModel.create(
      technicianObj
    );
    // console.log('request1:', request1);

    res.json(technician1);
    return
  } catch (error) {
    res.json({
      error: true,
      message: error.message
    });
    return
  }
};

const createEmployer = async (req, res, next) => {

  console.log('createTechnician()');

  console.log(req.body);
  // {
  //   employerId: dmksadmlkd
  // }


  try {
    //create obj
    const employerObj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.location,
      // picture: tricky
    };

    //update in db
    const employer1 = await employer.employerModel.create(
      employerObj
    );
    // console.log('request1:', request1);

    res.json(employer1);
    return
  } catch (error) {
    res.json({
      error: true,
      message: error.message
    });
    return
  }
};


// const file = req.file
// if (!file) {
//   const error = new Error('Please upload a file')
//   error.httpStatusCode = 400
//   return next(error)
// }
//   res.send(file)


const saveToDb = async (id) => {
        //DB SHENNNNN


      // const abc = await technician.technicianModel.findById(id);
      // abc.photo = req.file.publicUrl;
      // abc.save()
}

const updateTechnicianPhoto = async (req,res,next) => {
  const file = req.file
if (!file) {
  const error = new Error('Please upload a file')
  error.httpStatusCode = 400
  return next(error)
}
//
const abc = await technician.technicianModel.findById(req.params.id);
console.log("abcccc");
console.log(abc);
console.log(file);


// abc.picture = req.file.publicUrl;
abc.picture = req.file.location;

await abc.save()
console.log(abc);


  res.send(file)
}

module.exports = {
  login,
  getAllJobs,
  getAllTechnicians,
  getAllEmployers,
  postJob,
  createTechnician,
  createEmployer,
  updateTechnicianPhoto,
  getJobsByEmployerId

}