const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [ true, 'Review can not be empty' ]
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: [ true, 'Review must belong to a tour.' ]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [ true, 'Review must belong to a user' ]
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  
  this.populate({
    path: 'user',
    select: 'name photo'
  })
  
  next();
});

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  
  console.log(stats);
  
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0
    });
  }
};

reviewSchema.post('save', function () {
  // this points to the current review
  // post does not access to next();
  this.constructor.calcAverageRatings(this.tour);
})

// reviewSchema.pre(/^findOneAnd/, async function (next) {
//   this.r =
//       await this.findOne()
//                 .clone();
//   // console.log(this.r);
//   // console.log(r);
//   next();
// })

reviewSchema.post(/^findOneAnd/, async function (doc) {
  //this.findOne doesnt work here, query has already executed
  await doc.constructor.calcAverageRatings(doc.tour);
});

// reviewSchema.post(/^findOneAnd/, async function () {
//   // await this.findOne(); does not work here, a query has already been
// executed // this.r = //     await this.findOne() //               .clone();
// console.log('this.r before: ', this.r); await
// this.r.constructor.calcAverageRatings(this.r.tour); console.log('this.r
// after: ', this.r); });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
