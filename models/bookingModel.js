const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    // type: mongoose.Schema.ObjectId,
    // type: Schema.Types.ObjectId,
    ref: 'Tour',
    required: [ true, 'Booking must belong to a Tour' ]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // type: mongoose.Schema.ObjectId,
    // type: Schema.Types.ObjectId,
    ref: 'User',
    required: [ true, 'Booking must belong to a Tour' ]
  },
  price: {
    type: Number,
    required: [ true, 'Booking must have a price' ],
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  }
});

bookingSchema.pre(/^find/, function (next) {
  // this.populate([
  //   {
  //     path: 'user',
  //     select: '-passwordChangedAt -role',
  //   },
  //   {
  //     path: 'tour',
  //     select: 'name',
  //   },
  // ])
  //
  // next()
  
  this.populate('user')
      .populate({
        path: 'tour',
        select: 'name'
      });
  next();
})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
