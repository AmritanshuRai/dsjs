const mongoose = require('mongoose');
const { info, error } = require('../utils/chalk.util');

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

module.exports = connectDB;

// useNewUrlParser: true,
// //       useUnifiedTopology: false,
// //       useFindAndModify: false,
