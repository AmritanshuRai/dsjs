const Question = require('../models/Question.model');

exports.postQuestion = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const solution = req.body.solution;
  const explanation = req.body.explanation;
  const collectionName = req.url.split('/')[1];
  const id = req.body.id;
  try {
    const question = new Question(title, description, solution, explanation);
    const result = await question.save(collectionName, id);
    res
      .status(201)
      .json({ message: `submitted to ${collectionName}!`, result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getQuestions = async (req, res, next) => {
  const collectionName = req.url.split('/')[1];
  try {
    let questionObj = await Question.fetchAll(collectionName);
    res.setHeader('content-type', 'application/json');
    res
      .status(201)
      .json({ questionObj: `fetched from ${collectionName}!`, questionObj });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    let result = await Question.deleteById(req.params.id);
    res.status(201).json({ questionObj: 'deleted!!', result });
  } catch (err) {
    console.log(err);
  }
};
