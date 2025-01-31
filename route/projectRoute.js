const express = require('express');
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject} = require('../controller/projectController');
const { authentication, restrictTo } = require('../controller/authController');
const router = express.Router();

router.post('/', authentication, restrictTo('0'),createProject);

router.get('/',authentication, getAllProjects)

router.get('/:id', authentication, getProjectById)

router.patch('/:id',authentication, updateProject)

router.delete('/:id',authentication, deleteProject)

module.exports = router;
