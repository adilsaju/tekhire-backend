const express = require('express');
const { clockIn, clockOut, getAttendance } = require('../controllers/attendanceController');
const { getAllJobs, test ,getAllTechnicians,getAllEmployers,postJob,
    createTechnician,
    createEmployer,

    updateTechnicianPhoto,
    getJobsByEmployerId,
    getTechnicianById,
    updateJobImages,

    createRoom,
    deleteRoom,
    getAllRooms,
    getAllMessages

} = require('../controllers/mainController')
const {  getAllOffers, getOfferById, getOfferByJobId, createOffer, acceptoffer, getEmployment, getOfferByTechnicianId, getEmploymentbyTechnicianId, getEmploymentbyOfferId} = require('../controllers/offerController')

const {uploadTechPhoto, uploadJobPhotos} = require('./multer/multer-utils');
// const multer = require('multer');
// const path = require('path');
const session = require('express-session');
const { OAuth2Client } = require('google-auth-library');


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


/////
router.route('/rooms').get(getAllRooms).delete(deleteRoom).post(createRoom)
router.route('/messages').get(getAllMessages)











// Configure the OAuth2Client with your client ID and secret
const client = new OAuth2Client(
    '843415238351-7rk27liocmmf1f6fs0um51enf9j7qfsn.apps.googleusercontent.com',
    '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',
    'https://www.facebook.com'
  );
// Define a route that initiates the OAuth flow and redirects the user to Google Sign-in page
router.get('/auth/google', (req, res) => {
    const url = client.generateAuthUrl({
      access_type: 'offline',
      scope: 'profile email'
    });
    res.redirect(url);
  });
  
  // Define a route that handles the OAuth callback request
  router.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
  
    try {
      // Exchange the authorization code for an access token and user information
      const { tokens } = await client.getToken(code);
      const { id_token } = tokens;
      const ticket = await client.verifyIdToken({ idToken: id_token });
      const payload = ticket.getPayload();
  
      // Store the user information in the session or database
      req.session.user = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      };
  
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.redirect('/login');
    }
  });
  
  // Define a protected route that requires authentication
  router.get('/dashboard', (req, res) => {
    if (req.session.user) {
      res.send(`Welcome, ${req.session.user.name}!`);
    } else {
      res.redirect('/login');
    }
  });
  






module.exports = router;
