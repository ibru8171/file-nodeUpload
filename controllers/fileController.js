
const multer = require('multer');
const path = require('path');
const File = require('../models/fileSchema');


exports.uploadFile = (req, res) => {
  console.log("Inside upload method");
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'File upload failed', error: err.message });
    }

    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
    });

    try {
      await file.save();
      res.status(200).json({ message: 'File uploaded successfully', file });
    } catch (error) {
      res.status(500).json({ message: 'Error saving file details', error: error.message });
    }
  });
};

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single('file');

// Controller functions

exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching files', error: error.message });
  }
};

// upload file

exports.getOneFile = async (req, res) => {
  const fileId = req.params.id;

  try {
    const file = await File.findById(fileId);
    if (file) {
      res.status(200).json(file);
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching file', error: error.message });
  }
};

exports.deleteFile = async (req, res) => {
  const fileId = req.params.id;

  try {
    const deletedFile = await File.findByIdAndDelete(fileId);
    if (deletedFile) {
      res.status(200).json({ message: 'File deleted successfully', deletedFile });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting file', error: error.message });
  }
};
