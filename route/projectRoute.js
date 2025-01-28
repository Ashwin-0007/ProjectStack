const express = require('express');
const { createProject } = require('../controller/projectController');
const { authentication } = require('../controller/authController');
const router = express.Router();

router.post('/', authentication, createProject);

module.exports = router;
