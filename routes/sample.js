const express = require('express');
const {createAdmin, getAllJobs, login} = require('../controllers/mainController')

// const multer = require('multer');
// const path = require('path');

const router = express.Router();



router.route('/createAdmin').get(createAdmin);
router.route('/login').get(login);
router.route('/getAllJobs').get(getAllJobs);

module.exports = router;
