const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const pendingQuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The title is required'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'The description  is required'],
      trim: true,
    },
    solution: {
      type: String,
      required: [true, 'The solution  is required'],
      trim: true,
    },
    explanation: {
      type: String,
      required: [true, 'The explanation  is required'],
      trim: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    // level: {
    //   type: Number,
    //   required: true,
    // },
    slug: String,
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

const PendingQuestionModel = mongoose.model(
  'PendingQuestion',
  pendingQuestionSchema
);
exports.pendingQuestionSchema = pendingQuestionSchema;
exports.PendingQuestion = PendingQuestionModel;
