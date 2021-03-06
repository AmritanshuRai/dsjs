const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

const dotenv = require('dotenv');
const { seperator, info, error } = require('./utils/chalk.util');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
var xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const connectDB = require('./config/db.js');

//middleware
const morganMiddleware = require('./middlewares/morgan.middleware');
const errorHandler = require('./middlewares/error.middleware');

//load env vars
dotenv.config({ path: './config/config.env' });

//routes
const questions = require('./routes/questions.route');
const pendingQuestions = require('./routes/pendingQuestions.route');
const auth = require('./routes/auth.route');
const users = require('./routes/user.route');
const level = require('./routes/level.route');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
let YOUR_DOMAIN = 'https://jsalgo.com';
//connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

// Cookie parser
// app.use(cookieParser());

// Dev logger middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morganMiddleware);
  YOUR_DOMAIN = 'http://localhost:3000';
}

// File upload
// app.use(fileupload());

//sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//xss prevention
// app.use(xss());

//Rate Limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);

//Prevent http param pollution
app.use(hpp());

app.use(cors());

//mount routers
// app.use('/api/v1/bootcamps', bootcamps);

// if (process.env.NODE_ENV === 'production') {
//   app.use(compression());
//   app.use(enforce.HTTPS({ trustProtoHeader: true }));

//   app.use(express.static(path.join(__dirname, 'client/build')));
// }

// app.get('/service-worker.js', (req, res) => {
//   res.send(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
// });

// app.post('/payment', (req, res) => {
//   const body = {
//     source: req.body.token.id,
//     amount: req.body.amount,
//     currency: 'inr',
//     description: 'random description',
//   };

//   stripe.charges.create(body, (stripeErr, stripeRes) => {
//     if (stripeErr) {
//       res.status(500).send({ error: stripeErr });
//     } else {
//       res.status(200).send({ success: stripeRes });
//     }
//   });
// });

app.post('/api/v1/create-checkout-session', async (req, res) => {
  const price = req.body.priceForStripe < 100 ? 100 : req.body.priceForStripe;
  const currency = req.body.country === 'IN' ? 'inr' : 'usd'; 
  const session = await stripe.checkout.sessions.create({
    locale : 'auto',
    billing_address_collection: 'auto',
    submit_type: 'donate',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: 'You are donating',
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/canceled`,
  });
  res.json({ id: session.id });
});

// app.get('/questions', getQuestions);
// app.get('/pendingQuestions', getQuestions);
// app.post('/pendingQuestions', postQuestion);
// app.post('/questions', postQuestion);
// app.delete('/:id', deleteQuestion);

// if (process.env.NODE_ENV === 'production') {
//   app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URI}`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: false,
//       useFindAndModify: false,
//     });
//     app.listen(port, (error) => {
//       if (error) throw error;
//       console.log('Server running on port ' + port);
//     });
//   } catch (error) {
//     console.log('error: ', error);
//   }
// })();

//mount routers
app.use('/api/v1/questions', questions);
app.use('/api/v1/pendingquestions', pendingQuestions);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/level', level);

app.use(function (req, res, next) {
  res.status(404).json({
    success: false,
    message: `url not found 😐`,
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  info(
    `server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);

//handle unhandledRejection
process.on('unhandledRejection', (err) => {
  error(`unhandled error : ${err.stack}`);
  //close the server and exit process
  server.close(() => {
    return process.exit(1);
  });
});
