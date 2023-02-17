const express = require('express');
const {createAdmin, getAllJobs} = require('../controllers/mainController')

// const multer = require('multer');
// const path = require('path');

const router = express.Router();



router.route('/login').get(createAdmin);
router.route('/getAllJobs').get(getAllJobs);

module.exports = router;
