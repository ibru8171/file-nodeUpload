
const express = require('express');
// create an object for the class router in express

const router = express.Router();
// create router to define the path to resolve
const fileController = require('../controllers/fileController');


//  GET request to get all files from database
router.get('/', fileController.getAllFiles);
// upload file
router.post('/upload', fileController.uploadFile);
// get one file by id
router.get('/:id', fileController.getOneFile);
// delete file with its id
router.delete('/:id', fileController.deleteFile);

module.exports = router;
