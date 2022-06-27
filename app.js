const rateLimit = require('express-rate-limit');
const express = require('express');
const logger = require('./utils/logger')
// const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  //app.use(morgan('dev'));
  app.use(logger);
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  // standardHeaders: true,
  message: 'To many request from this IP, please try again in a hour.'
});

app.use('/api', limiter);

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   req.log.info("let's have a look on request and response, dude!")
//   // req.requestTime = new Date().toISOString();
//   next();
// });

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
