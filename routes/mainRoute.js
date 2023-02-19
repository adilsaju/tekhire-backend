const express = require('express');
const { getAllJobs, login,getAllTechnicians,getAllEmployers,postJob,
    createTechnician,
    createEmployer

} = require('../controllers/mainController')
const {  getAllOffers, getOfferById, getOfferByJobId} = require('../controllers/offerController')

// const multer = require('multer');
// const path = require('path');

const router = express.Router();


router.route('/login').get(login);

router.route('/jobs').get(getAllJobs).post(postJob);
router.route('/jobs/:id').get(getAllJobs);


router.route('/technicians').get(getAllTechnicians).post(createTechnician);

router.route('/employers').get(getAllEmployers).post(createEmployer);

router.route('/offers').get(getAllOffers);
router.route('/offers/:id').get(getOfferById);
router.route('/jobs/:id/offers').get(getOfferByJobId);
//CHAT
// router.route('/message').post(chat);



module.exports = router;
