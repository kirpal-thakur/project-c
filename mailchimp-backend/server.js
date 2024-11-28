// Import required libraries
const express = require('express'); // Express framework for server setup
const mailchimp = require('@mailchimp/mailchimp_marketing'); // Mailchimp SDK
const cors = require('cors'); // CORS middleware to handle cross-origin requests
const bodyParser = require('body-parser'); // Middleware to parse JSON request bodies
const axios = require('axios'); // Axios for making HTTP requests

// Initialize Express app
const app = express();
const port = 3000; // Port for the server to listen on

// Enable CORS for all requests
app.use(cors());

// Use body-parser to parse JSON request bodies
app.use(bodyParser.json());

// --- MAILCHIMP CONFIGURATION ---
mailchimp.setConfig({
  apiKey: '62a0ffa8d6e9c3d5ed7c8a09e9111b41-us17', // Your Mailchimp API key
  server: 'us17', // Your Mailchimp server prefix (from your API key)
});

// Route to handle Mailchimp subscription
app.post('/subscribe', async (req, res) => {
  const { email } = req.body; // Extract email from request body

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ message: 'Email is required!' });
  }

  try {
    // Add email to Mailchimp list
    const response = await mailchimp.lists.addListMember('7afbbb070a', { // Replace with your actual list ID
      email_address: email,
      status: 'pending', // 'pending' sends a confirmation email to the subscriber
    });

    res.status(200).json({ message: 'Successfully subscribed!' });
    console.log('Successfully subscribed:', response);
  } catch (error) {
    if (error.response && error.response.body) {
      console.error('Mailchimp error:', error.response.body);
    } else {
      console.error('Unknown error:', error);
    }

    // Handle errors like duplicate email addresses
    res.status(500).json({
      message: 'Error subscribing to Mailchimp. Email may already exist or another issue occurred.',
    });
  }
});

// --- RECAPTCHA CONFIGURATION ---
const SECRET_KEY = '6LcyRIIqAAAAABEgIQz-ig1cwdnukM0ssRk6phHd'; // Replace with your actual secret key

// Route to verify Google reCAPTCHA token
app.post('/api/verify-captcha', async (req, res) => {
  const { token } = req.body; // Extract token from request body

  // Check if token is provided
  if (!token) {
    return res.status(400).json({ success: false, message: 'Token is required!' });
  }

  try {
    // Validate token with Google reCAPTCHA API
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: SECRET_KEY,
          response: token,
        },
      }
    );

    const data = response.data;

    if (data.success) {
      res.status(200).json({ success: true, message: 'Captcha verified successfully!' });
    } else {
      res.status(400).json({
        success: false,
        message: 'Captcha verification failed.',
        errors: data['error-codes'],
      });
    }
  } catch (error) {
    console.error('Error verifying captcha:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Start the server and listen for requests
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
