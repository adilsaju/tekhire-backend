
const express = require('express');
const router = express.Router();


const { login, createTechnician, createClient } = require('../controllers/authController')


router.route('/login').post(login);

//TODO:
router.route('/createTechnician').post(createTechnician);
router.route('/createClient').post(createClient);

module.exports = router;
