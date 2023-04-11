const express = require('express');
const {protect} = require('../middlewares/authMiddleware')
const { clockIn, clockOut, getAttendance } = require('../controllers/attendanceController');
const {
   test ,getAllTechnicians,getAllEmployers,
    createTechnician,
    createEmployer,

    updateTechnicianPhoto,
    updateEmployerPhoto,
    getTechnicianById,
    getEmployerById,
    getUserById,

    getTehcnicianTotalIncomeHours,
    getCompletions

} = require('../controllers/mainController')
const {  getAllOffers, getOfferById, getOfferByJobId, createOffer, acceptoffer, getEmployment, getOfferByTechnicianId, getEmploymentbyTechnicianId, getEmploymentbyOfferId, editOffer, deleteOffer} = require('../controllers/offerController')

const {    createRoom,
  deleteRoom,
  getAllRooms,
  getAllMessages } = require('../controllers/chatController')

  const {   getJobsByEmployerId,
    getAllJobs,
    postJob,
    updateJobImages, editJob, deleteJob } = require('../controllers/jobController')


const {uploadTechPhoto, uploadJobPhotos} = require('./multer/multer-utils');
// const multer = require('multer');
// const path = require('path');
const session = require('express-session');
const { OAuth2Client } = require('google-auth-library');


const router = express.Router();

router.route('/test').get(test);


router.route('/jobs').get(protect,getAllJobs).post(protect,postJob);
router.route('/jobs/:id').get(protect,getAllJobs).patch(protect,editJob)




router.route('/employer/:id/jobs').get(protect,getJobsByEmployerId)

router.route('/employments').get(protect,getEmployment)

router.route('/technicians').get(protect,getAllTechnicians).post(protect,createTechnician)

//IMAGES

//post or update images
router.route('/jobs/:id/images').patch(protect,uploadJobPhotos,updateJobImages);
router.route('/technicians/:id').get(protect,getTechnicianById).patch(protect,uploadTechPhoto,updateTechnicianPhoto);

router.route('/employers').get(protect,getAllEmployers).post(protect,createEmployer);
router.route('/employers/:id').get(protect,getEmployerById).patch(protect,uploadTechPhoto,updateEmployerPhoto);
router.route('/users/:id').get(protect,getUserById)

// .patch(createEmployer);


router.route('/offers').get(protect,getAllOffers).post(protect,createOffer);
router.route('/offers/:id').get(protect,getOfferById);
router.route('/job/:id/offers').get(protect,getOfferByJobId);
router.route('/offers/:id/accept').post(protect,acceptoffer)
router.route('/technician/:id/offers').get(protect,getOfferByTechnicianId)
//CHAT
// router.route('/message').post(chat);

router.route('/jobs/:id/clockin').post(protect,clockIn)
router.route('/jobs/:id/clockout').post(protect,clockOut)
router.route('/attendance').get(protect,getAttendance)

router.route('/technician/:id/employment').get(protect,getEmploymentbyTechnicianId)
router.route('/offer/:id/employment').get(protect,getEmploymentbyOfferId)


/////
router.route('/rooms').get(protect,getAllRooms).delete(protect,deleteRoom).post(protect,createRoom)
router.route('/rooms/:id/messages').get(protect,getAllMessages)

router.route('/technicians/:id/income_hours').get(protect,getTehcnicianTotalIncomeHours)

router.route('/openai/completions').post(protect,getCompletions)



module.exports = router;
