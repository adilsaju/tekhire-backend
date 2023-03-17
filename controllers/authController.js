const express = require('express');
const employer = require('../models/employerModel');
const technician = require('../models/technicianModel');
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
