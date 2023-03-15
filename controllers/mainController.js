// const Job = require('../models/JobModel.js');
const express = require('express');
const job = require('../models/jobModel')
const employer = require('../models/employerModel')
const technician = require('../models/technicianModel');
const offer = require('../models/offerModel')
const chat = require('../models/chatModel')
const employment = require('../models/employmentModel')
// require('dotenv').config()



const test = async (req, res, next) => {
  // console.log("login");

  // res.json("login")
  console.log("success");
  res.json("success")

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

const getTechnicianById = async (req,res,next) => {

  try {
    const abc = await technician.technicianModel.findById(req.params.id);
    res.json(abc)
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}
const getEmployerById = async (req,res,next) => {

  try {
    const abc = await employer.employerModel.findById(req.params.id);
    res.json(abc)
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}
const getUserById = async (req, res, next) => {
  const id = req.params.id;

  try {
    let user = await technician.technicianModel.findById(id).lean();
    
    if (!user) {
      user = await employer.employerModel.findById(id).lean();
      user.user_type = "employer"
    }else{
      user.user_type = "technician"
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
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
const updateEmployerPhoto = async (req,res,next) => {
  const file = req.file
if (!file) {
  const error = new Error('Please upload a file')
  error.httpStatusCode = 400
  return next(error)
}
//
const abc = await employer.employerModel.findById(req.params.id);
console.log("abcccc");
console.log(abc);
console.log(file);


// abc.picture = req.file.publicUrl;
abc.picture = req.file.location;

await abc.save()
console.log(abc);


  res.send(file)
}

 const getTehcnicianTotalIncomeHours = async (req,res,next) => {
  console.log("getTehcnicianTotalIncomeHours");
  const techId = req.params.id

  const emp1 = await employment.employmentModel.find({"technician_accepted": techId}).lean()

  let totalH = 0
  let totalI = 0

  for (let i =0 ; i< emp1.length; i++)
  {
    totalH = totalH + emp1[i].total_hours
  }
  for (let i =0 ; i< emp1.length; i++)
  {
    totalI = totalI + emp1[i].total_income
  }

  res.json({
    "income": totalI,
    "hours": totalH
  })
}





const getCompletions = async (req,res,next) => {
  console.log("getCompletions");
  const body = {
    prompt: req.body.message,
    max_tokens: 64,
    n: 5,
    // stop: ['\n'],
    model: "text-davinci-002"
  }
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body),
});
const data = await response.json();

res.json(data)

}


module.exports = {
  test,
  getAllTechnicians,
  getAllEmployers,
  createTechnician,
  createEmployer,
  updateTechnicianPhoto,
  updateEmployerPhoto,
  getTechnicianById,


getEmployerById,
getUserById,

getTehcnicianTotalIncomeHours,
getCompletions

}