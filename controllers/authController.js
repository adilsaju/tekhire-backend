const express = require('express');
const employer = require('../models/employerModel');
const technician = require('../models/technicianModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const admin = require('../config/firebase.config');

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
        firebase_uid: firebase_uid,
        phone: phone,
        role_type: role_type,
      });

      return res.status(201).json({
        error: false,
        message: 'user added success',
        data: clientUser,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: 'failed', data: error });
  }
};

const createHashPassword = async (password) => {
  // const salt = await bcrypt.genSalt()
  const hashPassword = await bcrypt.hash(password, 10);
  // console.log("salt", salt);
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

module.exports = {
  login,
  create_Client_Technician,
  createHashPassword,
};

/*
console.log('login()');
  user = req.body;

  const token = await jwt.sign({ user }, 'secretkey', { expiresIn: '30000m' });

  const studentUser = await technician.technicianModel.findOne({
    email: req.body.email,
  });

  const adminUser = await employer.employerModel.findOne({
    email: req.body.email,
  });

  if (studentUser != null) {
    try {
      if (await bcrypt.compare(req.body.password, studentUser.password)) {
        console.log('scc');
        res.send({
          error: false,
          message: 'login success',
          data: studentUser,
          token: token,
          isTechnician: true,
        });
      } else {
        console.log('pwd incorrect');
        res.json({ error: true, message: 'Not allowed. Password incorrect' });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else if (adminUser != null) {
    try {
      if (await bcrypt.compare(req.body.password, adminUser.password)) {
        console.log('scc');
        res.send({
          error: false,
          message: 'login success',
          data: adminUser,
          token: token,
          isTechnician: false,
        });
      } else {
        console.log('pwd incorrect');
        res.json({ error: true, message: 'Not allowed. Password incorrect' });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(400).send({ error: true, message: 'cannot find email' });
  } */
