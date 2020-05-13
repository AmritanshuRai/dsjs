const { Question, PendingQuestions } = require('../models/Question.model');
const mongoose = require('mongoose');

exports.postQuestion = async (req, res, next) => {
  const collectionName = req.url.split('/')[1];
  if (collectionName == 'pendingQuestions') {
    try {
      await new PendingQuestions(req.body).save();
      return res
        .status(201)
        .json({ message: `posted to pendingQuestions!`, shortMsg: `posted` });
    } catch (err) {
      throw new Error('unable to post in pendingQuestion!');
    }
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await new Question(req.body).save({ session });
    await PendingQuestions.findByIdAndRemove(req.body.id).session(session);
    await session.commitTransaction();
    res.status(201).json({
      message: `posted to questions and deleted from pendingQuestions!`,
      shortMsg: `postedAndDeleted`,
    });
  } catch (err) {
    await session.abortTransaction();
    throw new Error('unable to post!');
  } finally {
    session.endSession();
  }
};

exports.getQuestions = async (req, res, next) => {
  const collectionName = req.url.split('/')[1];
  try {
    let questionObj;
    if (collectionName == 'questions') {
      questionObj = await Question.find().sort({ _id: -1 });
    } else {
      questionObj = await PendingQuestions.find();
    }
    res
      .status(200)
      .json({ message: `fetched from ${collectionName}!`, questionObj });
  } catch (err) {
    console.log('err: ', err);
    res.status(500).json({ error: 'unable to fetch' });
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    let result = await PendingQuestions.findByIdAndRemove(req.params.id);
    res.status(201).json({ questionObj: 'deleted!!', result });
  } catch (err) {
    console.log('err: ', err);
    res.status(500).json({ error: 'unable to delete!' });
  }
};
