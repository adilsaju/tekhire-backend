const express = require('express');
const { clockIn, clockOut, getAttendance } = require('../controllers/attendanceController');
const { getAllJobs, test ,getAllTechnicians,getAllEmployers,postJob,
    createTechnician,
    createEmployer,

    updateTechnicianPhoto,
    getJobsByEmployerId,
    getTechnicianById,
    updateJobImages

} = require('../controllers/mainController')
const {  getAllOffers, getOfferById, getOfferByJobId, createOffer, acceptoffer, getEmployment, getOfferByTechnicianId, getEmploymentbyTechnicianId, getEmploymentbyOfferId} = require('../controllers/offerController')

const {uploadTechPhoto, uploadJobPhotos} = require('./multer/multer-utils');
// const multer = require('multer');
// const path = require('path');

const router = express.Router();

router.route('/test').get(test);


router.route('/jobs').get(getAllJobs).post(postJob);
router.route('/jobs/:id').get(getAllJobs);




router.route('/employer/:id/jobs').get(getJobsByEmployerId)

router.route('/employments').get(getEmployment)

router.route('/technicians').get(getAllTechnicians).post(createTechnician)

//IMAGES

//post or update images
router.route('/jobs/:id/images').patch(uploadJobPhotos,updateJobImages);
router.route('/technicians/:id').get(getTechnicianById).patch(uploadTechPhoto,updateTechnicianPhoto);

router.route('/employers').get(getAllEmployers).post(createEmployer);

router.route('/offers').get(getAllOffers).post(createOffer);
router.route('/offers/:id').get(getOfferById);
router.route('/job/:id/offers').get(getOfferByJobId);
router.route('/offers/:id/accept').post(acceptoffer)
router.route('/technician/:id/offers').get(getOfferByTechnicianId)
//CHAT
// router.route('/message').post(chat);

router.route('/jobs/:id/clockin').post(clockIn)
router.route('/jobs/:id/clockout').post(clockOut)
router.route('/attendance').get(getAttendance)

router.route('/technician/:id/employment').get(getEmploymentbyTechnicianId)
router.route('/offer/:id/employment').get(getEmploymentbyOfferId)

module.exports = router;
