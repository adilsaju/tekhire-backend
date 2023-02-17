const express = require('express');
const { getAllJobs, login,getAllTechnicians,getAllEmployers} = require('../controllers/mainController')

// const multer = require('multer');
// const path = require('path');

const router = express.Router();


router.route('/login').get(login);

router.route('/jobs').get(getAllJobs);
router.route('/technicians').get(getAllTechnicians);
router.route('/employers').get(getAllEmployers);


module.exports = router;
