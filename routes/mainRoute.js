const express = require('express');
const { getAllJobs, login,getAllTechnicians,getAllEmployers,postJob, getAllOffers, getOfferById, getOfferByJobId} = require('../controllers/mainController')

// const multer = require('multer');
// const path = require('path');

const router = express.Router();


router.route('/login').get(login);

router.route('/jobs').get(getAllJobs).post(postJob);
router.route('/jobs/:id').get(getAllJobs);


router.route('/technicians').get(getAllTechnicians);

router.route('/employers').get(getAllEmployers);

router.route('/offers').get(getAllOffers);
router.route('/offer/:id').get(getOfferById);
router.route('/job/:id/offer').get(getOfferByJobId);

module.exports = router;
