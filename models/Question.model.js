const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    solution: {
      type: String,
      required: true,
      trim: true,
    },
    explanation: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

exports.Question = mongoose.model('Questions', questionSchema, 'questions');
exports.PendingQuestions = mongoose.model(
  'PendingQuestions',
  questionSchema,
  'pendingQuestions',
);
