const express = require('express');
const router = express.Router();
const session = require('express-session');

const {
  login,
  create_Client_Technician,
  google_Login,
  google_User_Login,
} = require('../controllers/authController');

const middleware = require('../middlewares/authMiddleware');

const testing = async (req, res, next) => {
  console.log('success');
  res.json('success');
};

router.route('/works').get(testing);
router.route('/login', middleware.decodeToken).post(login);
router.route('/register').post(create_Client_Technician);
router.route('/google-login').post(google_Login);
router.route('/google-user-login').post(google_User_Login);

module.exports = router;
