// const Job = require('../models/JobModel.js');
const express = require('express');
const job = require('../models/jobModel')
const employer = require('../models/employerModel')
const technician = require('../models/technicianModel');
const offer = require('../models/offerModel')
const socketServer = require('../socket2/socket-server');
const employment = require('../models/employmentModel')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


  const createTechnician = async (req, res, next) => {
    console.log("login");



    
    res.json("success")
  
  };

  const createClient = async (req, res, next) => {
    console.log("login");



    
    res.json("success")
  
  };




const createHashPassword = async (password)=>{
    // const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, 10)
    // console.log("salt", salt);
    console.log("hashPassword", hashPassword);
  return hashPassword
}




const createStudent = ()=>{
  return async (req, res, next) => {
    try {
      const email = req.body.email
      const password = req.body.password
   
      const hashPassword = await createHashPassword(password)
       //save student to db
    const studentRequirements1 = await Checklist.studentRequirementsModel.create({flownHours: 123 , balance: 66, licenseType: "cpl", englishProficiency: true, medicalLicense: "abc", radioLicense: "abc", license: "xyz", isRequirementsOk: true })
       
    // //VALIDATION LOGIC 
    // if ( studentRequirements1.flownHours < studentRequirementsCutoff.flownHours){
    //   studentRequirements1.isRequirementsOk = false
    // }
    // if ( studentRequirements1.balance < studentRequirementsCutoff.balance){
    //   studentRequirements1.isRequirementsOk = false
    // }
    // // studentRequirements1.save();

    // if ( !studentRequirements1.license.startsWith("https://") || !studentRequirements1.radioLicense.startsWith("https://") || !studentRequirements1.medicalLicense.startsWith("https://") || !studentRequirements1.englishProficiency.startsWith("https://") ) {

    //   studentRequirements1.isRequirementsOk = false

    // }
// ===============================
    
    const student1 = await Student.studentModel.create({name: req.body.name || "abc" , email: email, password: hashPassword , studentRequirements: studentRequirements1  })

      validateStudentInDb(student1)

       res.status(201).json({error:false, message: "user added success", data: student1})
    } catch (error) {
      res.status(500).json({error: true, message: "failed", data: error})
    }
  };
}

const createAdmin = async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password
 
    const hashPassword = await createHashPassword(password)
     //save student to db
     const adm1 = await Admin.adminModel.create({name: req.body.name || "abc" , email: email, password: hashPassword })
     res.status(201).json({error:false, message: "user added success", data: adm1})
  } catch (error) {
    res.status(500).json({error: true, message: "failed", data: error})
  }
};

const login = async (req, res) => {

    //jwt sign

      console.log('login()');
      user = req.body

     const token =  await jwt.sign({user}, 'secretkey' , {expiresIn: '30000m' }) ;
    



    const studentUser = await technician.technicianModel.findOne({
      email: req.body.email,
    });

    const adminUser = await employer.employerModel.findOne({
      email: req.body.email,
    });

    if (studentUser != null) {

    try {
      if (
        await bcrypt.compare(
          req.body.password,
          studentUser.password
        )
      ) {
        console.log("scc");
        res.send({error: false, message: 'login success' , data: studentUser, token: token, isTechnician: true });
      } else {
        console.log("pwd incorrect");
        res.json({error: true, message: 'Not allowed. Password incorrect' });
      }
    } catch(error) {
      return res.status(500).json(error);
    }

  }else if  (adminUser != null) 
  {

    try {
      if (
        await bcrypt.compare(
          req.body.password,
          adminUser.password
        )
      ) {
        console.log("scc");
        res.send({error: false, message: 'login success' , data: adminUser, token: token, isTechnician: false });
      } else {
        console.log("pwd incorrect");
        res.json({error: true, message: 'Not allowed. Password incorrect' });
      }
    } catch(error) {
      return res.status(500).json(error);
    }




  }else {
      return res.status(400).send({error: true, message: 'cannot find email' });

  }

    
  
};










module.exports = {
  login,
  createTechnician, 
  createClient,
  createHashPassword
}

