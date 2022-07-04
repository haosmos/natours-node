const Tour = require('../models/tourModel');
const catchAsyncError = require('../utils/catchAsyncError');

exports.getOverview = catchAsyncError(async (req, res) => {
  // 1) Get tour data from collectors
  const tours = await Tour.find();
  
  // 2) Build template
  
  // 3) Render that template using tour data from step 1)
  
  res.status(200)
     .render('overview', {
       title: 'All tours',
       tours
     });
});

exports.getTour = catchAsyncError(async (req, res) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug })
                         .populate({
                           path: 'reviews',
                           fields: 'review rating user'
                         })
  
  // 2) Build template
  
  // 3) Render template
  
  res.status(200)
     .render('tour', {
       title: `${tour.name} Tour`,
       tour
     });
});
