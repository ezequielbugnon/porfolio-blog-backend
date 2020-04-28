const router = require('express').Router();
const projectController = require('../controllers/projectController');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verify');
const imageController = require('../controllers/imageController');
const cloudinary = require('cloudinary');

require('dotenv').config();

cloudinary.config({
    cloud_name:	process.env.CLOUD_NAME,
    api_key:	process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

router.get('/projects',projectController.getProjects);

router.post('/projects',verify ,projectController.createProject);

router.get('/project/:id',projectController.getProject);

router.put('/project/edit/:id',verify, projectController.editProject);

router.delete('/project/delete/:id', verify, projectController.deleteProject);

router.post('/project/image', verify,imageController.imageCreate);

router.get('/project/image/getOne/:id', imageController.getImage);

router.put('/project/image/edit/:id', verify, imageController.editImage);

router.delete('/project/image/delete/:id', verify, imageController.deleteImage);


module.exports = router;


