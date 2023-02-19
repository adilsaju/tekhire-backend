const express = require('express');
const { getAllJobs, login,getAllTechnicians,getAllEmployers,postJob,
    createTechnician,
    createEmployer,

    updateTechnicianPhoto

} = require('../controllers/mainController')
const {  getAllOffers, getOfferById, getOfferByJobId, createOffer, acceptoffer} = require('../controllers/offerController')

const {uploadTechPhoto} = require('./multer/multer-utils');
// const multer = require('multer');
// const path = require('path');

const router = express.Router();


router.route('/login').get(login);

router.route('/jobs').get(getAllJobs).post(postJob);
router.route('/jobs/:id').get(getAllJobs);


router.route('/technicians').get(getAllTechnicians).post(createTechnician).patch(updateTechnicianPhoto,uploadTechPhoto);
router.route('/technicians/:id').get().patch(uploadTechPhoto,updateTechnicianPhoto);

router.route('/employers').get(getAllEmployers).post(createEmployer);

router.route('/offers').get(getAllOffers).post(createOffer);
router.route('/offers/:id').get(getOfferById);
router.route('/jobs/:id/offers').get(getOfferByJobId);
router.route('/offers/:id/accept').post(acceptoffer)
//CHAT
// router.route('/message').post(chat);




module.exports = router;
