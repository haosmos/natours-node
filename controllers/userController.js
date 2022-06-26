const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsyncError = require('./../utils/catchAsyncError');
const AppError = require('./../utils/appError');
const slugify = require('slugify');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if(allowedFields.includes(el)) newObj[el] = obj[el];
  })
  return newObj;
}

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
 
  // Send response
  res.status(200)
     .json({
       status:  'success',
       results: users.length,
       data: {
        users
       }
     });
});

exports.updateMe = catchAsyncError(async (req, res, next) => {
  // 1) Create error if user POSTed password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password update. Please'
                             + ' use /updateMyPassword', 400));
  }
  
  // 2) Filtered out unwanted fields that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.getUser = (req, res) => {
  res.status(500)
     .json({
       status:  'error',
       message: 'This route is not yet implemented'
     });
};

exports.createUser = (req, res) => {
  res.status(500)
     .json({
       status:  'error',
       message: 'This route is not yet implemented'
     });
};

exports.updateUser = (req, res) => {
  res.status(500)
     .json({
       status:  'error',
       message: 'This route is not yet implemented'
     });
};

exports.deleteUser = (req, res) => {
  res.status(500)
     .json({
       status:  'error',
       message: 'This route is not yet implemented'
     });
};
