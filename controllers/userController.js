const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsyncError = require('./../utils/catchAsyncError');


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
