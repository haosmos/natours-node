import axios         from 'axios';
import { showAlert } from './alert';

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const stripe = Stripe(
        'pk_test_51LJadxCOpTT3xkBxeE5MTRWS6JZHtyEEt1qx4DqPLeM4N6f7nseAOHDEeA6q0HCsCIJiFRuTXohZcDNJDSrHZgJR00eBPke8YJ');
    // const session = await
    // axios(`/api/v1/bookings/checkout-session/${tourId}`)
    // console.log(session);
    
    // const session = await axios({
    //   url: `/api/v1/bookings/checkout-session/${tourId}`,
    // })
    //
    // // 2) Create a checkout form + change credit card
    // window.location.replace(session.data.session.url)
    
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);
    
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
    //
  } catch (e) {
    console.log(e);
    showAlert('error', e);
  }
}
