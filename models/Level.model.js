const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema(
  {
    level: {
      type: Number,
      enum: [1, 2, 3],
      required: [true, 'Please select a level'],
    },
    question: {
      type: mongoose.Schema.ObjectId,
      ref: 'Question',
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Static method to get avg level
LevelSchema.statics.setLevel = async function (questionId) {
  const obj = await this.aggregate([
    {
      $match: {
        question: questionId,
      },
    },
    {
      $group: {
        _id: '$question',
        averageLevel: {
          $avg: '$level',
        },
      },
    },
  ]);
  try {
    const updated = await this.model('Question').findByIdAndUpdate(questionId, {
      level: !!obj.length ? Math.ceil(obj[0].averageLevel) : 0,
    });
    console.log('updated: ', updated);
  } catch (error) {
    console.log('error: ', error);
  }
};

//Call setLevel after save
LevelSchema.post('save', async function () {
  await this.constructor.setLevel(this.question);
});

//Call setLevel before remove
// ReviewSchema.post('remove', async function () {
//   await this.constructor.setLevel(this.bootcamp);
// });

//  Prevent user from submitting more than one time per question
LevelSchema.index({ question: 1, user: 1 }, { unique: true });

exports.Level = mongoose.model('Level', LevelSchema);
