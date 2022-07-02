const logger = require('./../utils/logger')
const Tour = require('./../models/tourModel');
const catchAsyncError = require('./../utils/catchAsyncError');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

exports.getTourStats = catchAsyncError(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage', },
        avgPrice: { $avg: '$price', },
        minPrice: { $min: '$price', },
        maxPrice: { $max: '$price', },
      }
    },
    {
      $sort: { avgPrice: 1 }
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);
  
  res.status(200)
     .json({
       status: 'success',
       data: { stats }
     });
});

exports.getMonthlyPlan = catchAsyncError(async (req, res, next) => {
  const year = req.params.year * 1;
  
  const plan = await Tour.aggregate(
      [
        {
          $unwind: '$startDates'
        },
        {
          $match: {
            startDates: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`),
            }
          }
        },
        {
          $group: {
            _id: { $month: '$startDates' },
            numTourStarts: { $sum: 1 },
            tours: { $push: '$name' }
          }
        },
        {
          $addFields: { month: '$_id' }
        },
        {
          $project: { _id: 0 }
        },
        {
          $sort: { numTourStarts: -1 }
        },
        {
          $limit: 12
        }
      ]);
  
  res.status(200)
     .json({
       status: 'success',
       data: { plan }
     })
  
});

// /tours-within/:distance/center/:latlng/unit/:unit
// /tours-within/233/center/34.111745,-118.113491/unit/mi
exports.getToursWithin = catchAsyncError(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [ lat, lng ] = latlng.split(',');
  
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  
  if (!lat || !lng) {
    next(new AppError('Please provide latitude and longitude in the format:'
                      + ' lat, lng'));
  }
  
  const tours = await Tour.find({
    startLocation: {
      $geoWithin: {
        $centerSphere: [ [ lng, lat ], radius ]
      }
    }
  });
  
  console.log(distance, lat, lng, unit);
  
  res.status(200)
     .json({
       results: tours.length,
       status: 'success',
       data: {
         data: tours
       }
     })
});

exports.getDistances = catchAsyncError(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [ lat, lng ] = latlng.split(',');
  
  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
  
  if (!lat || !lng) {
    next(new AppError('Please provide latitude and longitude in the format:'
                      + ' lat, lng'));
  }
  
  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [ parseFloat(lng), parseFloat(lat) ],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier
      }
    },
    {
      $project: {
        distance: 1,
        name: 1
      }
    }
  ])
  
  res.status(200)
     .json({
       status: 'success',
       data: {
         data: distances
       }
     })
  
})
