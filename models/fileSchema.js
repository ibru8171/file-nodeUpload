
const mongoose = require('mongoose');
// create a schema for class in mongoose module
const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
