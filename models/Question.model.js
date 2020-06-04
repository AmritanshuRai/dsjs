const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The title is required'],
      text: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'The description is required'],
      trim: true,
    },
    solution: {
      type: String,
      required: [true, 'The solution is required'],
      trim: true,
    },
    explanation: {
      type: String,
      required: [true, 'The explanation is required'],
      trim: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    level: Number,
    slug: String,
  },
  {
    timestamps: true,
    // toJSON: { virtuals: true },
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
