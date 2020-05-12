const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');
const mongoConnect = require('./utils/database').mongoConnect;
const postQuestion = require('./controllers/question.controller').postQuestion;
const getQuestions = require('./controllers/question.controller').getQuestions;
const deleteQuestion = require('./controllers/question.controller')
  .deleteQuestion;

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
// const router = express.Router();

const port = process.env.PORT || 5000;
// app.use(compression());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
function setLongTermCache(res) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  res.setHeader('Expires', date.toUTCString());
  res.setHeader('Cache-Control', 'public, max-age=2628000, immutable');
}
function setNoCache(res) {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  res.setHeader('Expires', date.toUTCString());
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Cache-Control', 'public, no-cache');
}

if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(
    express.static(path.join(__dirname, 'client/build'), {
      extensions: ['html'],
      setHeaders(res, path) {
        if (path.match(/(\.html|\/sw\.js)$/)) {
          setNoCache(res);
          return;
        }

        if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json)$/)) {
          setLongTermCache(res);
        }
      },
    }),
  );

  app.get('*', function (req, res) {
    setNoCache(res);
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.get('/service-worker.js', (req, res) => {
  res.send(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});
app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'inr',
    description: 'random description',
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
app.get('/questions', getQuestions);
app.get('/pendingQuestions', getQuestions);
app.post('/pendingQuestions', postQuestion);
app.post('/questions', postQuestion);
app.delete('/:id', deleteQuestion);

mongoConnect(() => {
  app.listen(port, (error) => {
    if (error) throw error;
    console.log('Server running on port ' + port);
  });
});
