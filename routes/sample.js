const express = require('express');
const {createAdmin} = require('../controllers/mainController')

// const multer = require('multer');
// const path = require('path');

const router = express.Router();



router.route('/login').get(createAdmin);


module.exports = router;
