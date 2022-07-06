const path = require('path');
const express = require('express');
// const logger = require('./utils/logger')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'localhost:3000/');
//   res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

// Set security HTTP headers
// app.use(helmet());
app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: {
        allowOrigins: [ '*' ]
      },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [ '*' ],
          scriptSrc: [ '* data: \'unsafe-eval\' \'unsafe-inline\' blob:' ]
        }
      }
    })
)

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  // app.use(logger);
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  // standardHeaders: true,
  message: 'To many request from this IP, please try again in a hour.'
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({
  limit: '10kb'
}));
app.use(cookieParser());

// Data sanitization against NoSQL injections
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(hpp({
  whitelist: [
    'duration',
    'ratingsAverage',
    'ratingsQuantity',
    'difficulty',
    'price',
    'maxGroupSize'
  ]
}));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
})

// 3) ROUTES
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
