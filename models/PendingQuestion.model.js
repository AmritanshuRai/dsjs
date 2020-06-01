const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const pendingQuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The title of the question is required'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'The description of the question is required'],
      trim: true,
    },
    solution: {
      type: String,
      required: [true, 'The solution of the question is required'],
      trim: true,
    },
    explanation: {
      type: String,
      required: [true, 'The explanation of the question is required'],
      trim: true,
    },

    slug: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// // Create question slug from the title
pendingQuestionSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

exports.PendingQuestion = mongoose.model(
  'PendingQuestion',
  pendingQuestionSchema,
  'pendingQuestions'
);
exports.pendingQuestionSchema = pendingQuestionSchema;
