const Stripe = require('stripe');
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsyncError = require('../utils/catchAsyncError');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

exports.getCheckoutSession = catchAsyncError(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);
  
  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: [ 'card' ],
    
    // success_url:`${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
    success_url: `${req.protocol}://${req.get('host')}/my-tours`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [
          `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`
        ],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ]
  })
  
  // let user = (
  //     await User.findOne({ email: session.customer_email })
  // ).id;
  console.log(user);
  // console.log(session);
  // 3) Create session as response
  res.status(200)
     .json({
       status: 'success',
       session
     })
});

// exports.createBookingCheckout = catchAsyncError(async (req, res, next) => {
//   // This is only TEMPORARY, because it's UNSECURE: everyone can make
//   // bookings without paying
//   const { tour, user, price } = req.query;
//   if (!tour && !user && !price) {
//     return next();
//   }
//
//   await Booking.create({ tour, user, price });
//
//   res.redirect(req.originalUrl.split('?')[0]);
// });

const createBookingCheckout = async session => {
  const tour = session.client_reference_id;
  
  if (!session.customer_email) {
    throw new AppError('No user information found', 500)
  }
  
  // let user = await User.findOne({ email: session.customer_email });
  const userInfo = await User.findOne({ email: session.customer_email })
  console.log(userInfo);
  const user = userInfo._id
  console.log(userInfo);
  if (!user.customer_email) {
    throw new AppError('No user found', 404)
  }
  
  const price = session.amount_total / 100;
  await Booking.create({ tour, user, price });
}

exports.webhookCheckout = catchAsyncError(async (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  console.log(signature);
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (e) {
    return res.status(400)
              .send(`Webhook error: ${e.message}`);
  }
  
  if (event.type === 'checkout.session.completed') {
    await createBookingCheckout(event.data.object);
  }
  console.log(event);
  
  res.status(200)
     .json({ received: true })
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
