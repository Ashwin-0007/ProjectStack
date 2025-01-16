const express = require('express');
const { signup } = require('../controller/authController');
const router = express.Router();

// Define the signup route under '/signup' path
router.post('/signup', signup);

module.exports = router;
