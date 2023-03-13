const express = require('express');
const { getAllJobs, login,getAllTechnicians,getAllEmployers,postJob,
    createTechnician,
    createEmployer

} = require('../controllers/mainController')
const {  getAllOffers, getOfferById, getOfferByJobId, createOffer} = require('../controllers/offerController')
const { 
    getTechNotificationById,
    postTechNotificationById,
    getEmpNotificationById,
    postEmpNotificationById
} = require('../controllers/notificationController')


// const multer = require('multer');
// const path = require('path');

const router = express.Router();



router.route('/technicians/:id/notifications').get(getTechNotificationById).post(postTechNotificationById);
router.route('/employers/:id/notifications').get(getEmpNotificationById).post(postEmpNotificationById);


module.exports = router;