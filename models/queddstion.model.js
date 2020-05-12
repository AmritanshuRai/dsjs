const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Question', questionSchema);
