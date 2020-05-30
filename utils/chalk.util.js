const chalk = require('chalk');

exports.error = (str) => {
  console.log('\n' + chalk.red(` ${str} `) + '\n');
};
exports.info = (str) => {
  console.log('\n' + chalk.inverse.white(` ${str} `) + '\n');
};
exports.warning = (str) => {
  console.log('\n' + chalk.inverse.yellowBright(` ${str} `) + '\n');
};

exports.seperator = () => {
  console.log('\n' + chalk.inverse.yellowBright(`=`.repeat(150)) + '\n');
};
