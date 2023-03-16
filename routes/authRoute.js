const express = require('express');
const router = express.Router();
const session = require('express-session');
const { OAuth2Client } = require('google-auth-library');
const {
  login,
  create_Client_Technician,
} = require('../controllers/authController');

const testing = async (req, res, next) => {
  // console.log("login");

  // res.json("login")
  console.log('success');
  res.json('success');
};
router.route('/works').get(testing);
router.route('/login').post(login);
router.route('/register').post(create_Client_Technician);

/*
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
    scope: 'profile email',
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
      picture: payload.picture,
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
}); */

module.exports = router;
