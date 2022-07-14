// core version + navigation, pagination modules:
import Swiper, { Navigation } from 'swiper';
// import Swiper and modules styles
// import 'swiper/css';
// import 'swiper/css/navigation';

// init Swiper:
export const swiper = new Swiper('.reviews', {
  // configure Swiper to use modules
  modules: [ Navigation ],
  slidesPerView: 'auto',
  loop: true,
  
  breakpoints: {
    
    300: {
      slidesPerView: 1.5,
      spaceBetween: 15,
    },
    
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    
    1280: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    
    1920: {
      slidesPerView: 5,
      spaceBetween: 40,
    }
    
  },
  
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
  
  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // }
});
