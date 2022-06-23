const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const signToken = id => {
  return jwt.sign(
      { id: id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
  )
}

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt
  });
  
  const token = signToken(newUser._id);
  
  res.status(201)
     .json({
       status: 'success',
       token,
       data: {
         user: newUser
       }
     });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide a valid email and password', 400));
  }
  
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email: email, })
                         .select('+password');
  
  // user.correctPassword(password, user.password) return ONLY TRUE or FALSE!!!
  if (!user || !await user.correctPassword(password, user.password)) {
    return next(new AppError('Incorrect email or password', 401));
  }
  
  console.log(user);
  
  // 3) If everything ok, send token to a client
  const token = signToken(user._id);
  
  res.status(200)
     .json({
       status: 'success',
       token
     })
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (req.headers.authorization
      && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get'
                             + ' access.', 401));
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
  );
  console.log(decoded);
  
  // 3) Check if the user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no'
                             + ' longer exist.', 401));
  }
  
  // 4) Check if the user changes password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('The user recently changed password! Please log'
                             + ' in again.', 401));
  }
  
  // Grant access to protected route
  req.user = currentUser;
  next();
})