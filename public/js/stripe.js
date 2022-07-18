import axios         from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`)
    
    // 2) Create a checkout form + change credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (e) {
    console.log(e);
    showAlert('error', e);
  }
}
