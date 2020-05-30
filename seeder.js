const fs = require('fs');
const { warning, info, error } = require('./utils/chalk.util');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//Load env variables
dotenv.config({ path: './config/config.env' });
//Load models
const { Question } = require('./models/Question.model');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    info(`MongoDB Connected : ${conn.connection.host}`);
  } catch (err) {
    error(`MongoDB Connection failure : ${err.message}`);
  }
};
//read JSON files
const question = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/question.json`, 'utf-8')
);

//import in DB
const importData = async () => {
  try {
    await connectDB();
    await Question.create(questions);

    warning(`lauda ki sarkar created`);
  } catch (err) {
    console.error('err: ', err);
  } finally {
    process.exit();
  }
};

//Delete all
const deleteAll = async () => {
  try {
    await connectDB();
    await Question.deleteMany();

    warning(`lauda ki sarkar deleted`);
  } catch (err) {
    console.error('err: ', err);
  } finally {
    process.exit();
  }
};

const resetAllSync = async (total) => {
  console.log('total: ', total);

  let questions = [];
  for (let i = 0; i < total; i++) {
    title = `${i + 1}) Lorem ipsum dolor sit amet.`;
    questions[i] = { title, ...question };
  }
  try {
    await connectDB();
    await Question.deleteMany();

    warning(`lauda ki sarkar deleted`);
    await Question.create(questions);

    warning(`lauda ki sarkar created`);
  } catch (err) {
    console.error('err: ', err);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteAll();
} else {
  resetAllSync(process.argv[2] || 20);
}
