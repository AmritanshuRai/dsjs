const morgan = require('morgan');
const chalk = require('chalk');

const morganMiddleware = morgan(function (tokens, req, res) {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const strDateTime = tokens.date(req, res);
  const myDate = new Date(strDateTime).toLocaleDateString(undefined, options);
  const myTime = new Date(strDateTime).toLocaleTimeString();
  const methodColor = (methodName) => {
    switch (methodName) {
      case 'DELETE':
        return 'red';
      case 'POST':
        return 'green';
      case 'PUT':
        return 'blue';
      case 'GET':
        return 'yellow';
      default:
        return 'white';
    }
  };

  const statusColor = (status) => {
    const firstChar = status ? status.charAt(0) : '1';
    switch (firstChar) {
      case '4':
        return 'red';
      case '5':
        return 'blue';
      case '2':
        return 'green';
      default:
        return 'white';
    }
  };
  const methodColorStr = methodColor(tokens.method(req, res));
  const statusColorStr = statusColor(tokens.status(req, res));
  const methodSpace = 7 - tokens.method(req, res).length;
  return [
    chalk.bold('🍄 '),
    chalk[methodColorStr].inverse(
      ` ${tokens.method(req, res)}${' '.repeat(methodSpace)}`,
    ),
    chalk[statusColorStr].inverse(` ${tokens.status(req, res)} `),
    chalk[statusColorStr].bold('🌐 ' + tokens.url(req, res)),
    chalk.bold('⏱️  ' + tokens['response-time'](req, res) + ' ms'),
    chalk.magentaBright('📅 ' + myDate + ' - ' + myTime),
    chalk.yellow(tokens['remote-addr'](req, res)),
    chalk.blue(tokens['user-agent'](req, res)),
    chalk.bold(
      `${
        req.headers['content-type']
          ? req.headers['content-type']
          : chalk.inverse('no content-type present')
      }`,
    ),
    '\n',
  ].join(' ');
});

module.exports = morganMiddleware;
