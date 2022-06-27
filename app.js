const express = require('express');
const logger = require('./utils/logger')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
// const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  //app.use(morgan('dev'));
  app.use(logger);
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

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
// app.use((req, res, next) => {
//   req.log.info("let's have a look on request and response, dude!")
//   // req.requestTime = new Date().toISOString();
//   next();
// });D

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
