// const Job = require('../models/JobModel.js');
const express = require('express');
const job = require('../models/jobModel')
const employer = require('../models/employerModel')
const technician = require('../models/technicianModel');
<<<<<<< HEAD
const bcrypt = require('bcrypt');
const admin = require('../config/firebase.config');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(
  '289621286274-3oa8fkftfdi17amo8c550bk0c98p5s8n.apps.googleusercontent.com'
);

const create_Client_Technician = async (req, res, next) => {
  try {
    const email = req.body.email;
    const phone = req.body.phone;
    const name = req.body.name;
    const firebase_uid = req.body.firebase_uid;
    const role_type = req.body.role_type;

    if (role_type === 'technician') {
      const technicianUser = await technician.technicianModel.create({
        name: name,
        email: email,
        password: req.body.password,
        firebase_uid: firebase_uid,
        phone: phone,
        role_type: role_type,
      });

      return res.status(201).json({
        error: false,
        message: 'user added success',
        data: technicianUser,
      });
    } else {
      const clientUser = await employer.employerModel.create({
        name: name,
        email: email,
        password: req.body.password,
        firebase_uid: firebase_uid,
        phone: phone,
        role_type: role_type,
      });

      return res.status(201).json({
        error: false,
        message: 'user added success',
        data: clientUser,
      });
=======
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
>>>>>>> parent of 819a433 (Registration-firebase: ADDED code to accomodate firebase registration setup)
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

<<<<<<< HEAD
const createHashPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  console.log('hashPassword', hashPassword);
  return hashPassword;
};

const login = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);

    if (decodeValue) {
      const technicianUser = await technician.technicianModel.findOne({
        firebase_uid: decodeValue.uid,
      });

      const clientUser = await employer.employerModel.findOne({
        firebase_uid: decodeValue.uid,
      });

      if (technicianUser) {
        return res.status(201).json({
          error: false,
          message: 'user logged in',
          data: { user: technicianUser },
        });
      }

      if (clientUser) {
        return res.status(201).json({
          error: false,
          message: 'user logged in',
          data: { user: clientUser },
        });
      }
    }
    return res.json({ message: 'Un authorize' });
  } catch (e) {
    return res.json({ message: 'Internal Error' });
  }
};

const google_User_Login = async (req, res, nex) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience:
          '289621286274-3oa8fkftfdi17amo8c550bk0c98p5s8n.apps.googleusercontent.com',
      });
      const { email, name, picture, sub: googleid } = ticket.getPayload();

      console.log(email);
      const role_type = req.body.role_type;
      console.log(req.body);

      if (role_type === 'technician') {
        const technicianUser = await technician.technicianModel.create({
          name: name,
          email: email,
          password: 'randompassword',
          google_uid: googleid,
          role_type: role_type,
        });

        return res.status(201).json({
          error: false,
          message: 'user added success',
          data: technicianUser,
        });
      } else {
        const clientUser = await employer.employerModel.create({
          name: name,
          email: email,
          password: 'randompassword',
          google_uid: googleid,
          role_type: role_type,
        });

        return res.status(201).json({
          error: false,
          message: 'user added success',
          data: clientUser,
        });
      }
    }

    verify().catch((error) => {
      return res.json({ message: 'Unauthorize' });
    });
  } catch (e) {
    return res.json({ message: 'Internal Error' });
  }
};

const google_Login = async (req, res, nex) => {
  const token = req.headers.authorization.split(' ')[1];
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        '289621286274-3oa8fkftfdi17amo8c550bk0c98p5s8n.apps.googleusercontent.com',
    });
    const { email, name, picture, sub: googleid } = ticket.getPayload();

    const technicianUser = await technician.technicianModel.findOne({
      google_uid: googleid,
    });

    const clientUser = await employer.employerModel.findOne({
      google_uid: googleid,
    });

    if (technicianUser) {
      return res.status(201).json({
        error: false,
        message: 'user available',
        data: { user: technicianUser },
      });
    }

    if (clientUser) {
      return res.status(201).json({
        error: false,
        message: 'user available',
        data: { user: clientUser },
      });
    }

    return res.status(201).json({
      error: false,
      message: 'usernotindb',
      data: {},
    });
  }

  verify().catch((error) => {
    return res.json({ message: 'Unauthorize' });
  });
};

module.exports = {
  login,
  create_Client_Technician,
  createHashPassword,
  google_Login,
  google_User_Login,
};
=======
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

>>>>>>> parent of 819a433 (Registration-firebase: ADDED code to accomodate firebase registration setup)
