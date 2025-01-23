const express = require('express');
const { signup, login } = require('../controller/authController');
const router = express.Router();

// Define the signup route under '/signup' path
router.post('/signup', signup);

router.post('/login', login);

module.exports = router;
