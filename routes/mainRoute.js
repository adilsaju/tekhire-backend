const express = require('express');
const { getAllJobs, login,getAllTechnicians,getAllEmployers,postJob} = require('../controllers/mainController')
const {  getAllOffers, getOfferById, getOfferByJobId} = require('../controllers/offerController')

// const multer = require('multer');
// const path = require('path');

const router = express.Router();


router.route('/login').get(login);

router.route('/jobs').get(getAllJobs).post(postJob);
router.route('/jobs/:id').get(getAllJobs);


router.route('/technicians').get(getAllTechnicians);

router.route('/employers').get(getAllEmployers);

router.route('/offers').get(getAllOffers);
router.route('/offers/:id').get(getOfferById);
router.route('/jobs/:id/offers').get(getOfferByJobId);
//CHAT
// router.route('/message').post(chat);



module.exports = router;
