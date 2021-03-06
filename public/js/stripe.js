import axios         from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
    'pk_test_51LJadxCOpTT3xkBxeE5MTRWS6JZHtyEEt1qx4DqPLeM4N6f7nseAOHDEeA6q0HCsCIJiFRuTXohZcDNJDSrHZgJR00eBPke8YJ');

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
