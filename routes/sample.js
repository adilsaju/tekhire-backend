const express = require('express');

// const multer = require('multer');
// const path = require('path');

const router = express.Router();

const createAdmin = async (req, res, next) => {
    console.log("success"); 
    res.json("success")
  };

router.route('/login').get(createAdmin);


module.exports = router;
