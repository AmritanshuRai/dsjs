const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The title of the question is required'],
      text: true,
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
    level: Number,
    slug: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// // Create question slug from the title
questionSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const QuestionModel = mongoose.model('Question', questionSchema);
exports.questionSchema = questionSchema;
exports.Question = QuestionModel;
