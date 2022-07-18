// import '@babel/polyfill';
import { showAlert }      from './alert';
import { login, logout }  from './login';
import { displayMap }     from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour }       from './stripe';
import { signUp }         from './signUp';
import swiper             from './reviewsSlider';

// DOM Elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const signUpForm = document.querySelector('.signup-form');

// delegation
if (mapBox) {
  let locations = JSON.parse(mapBox.dataset.locations);
  
  displayMap(locations);
}

if (signUpForm) {
  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Change button text while Signing up a new user
    document.querySelector('.btn--signup').innerText = 'Signing...';
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await signUp(name, email, password, passwordConfirm);
    
    // Change button text and clear input-fields after Signing up new user
    document.querySelector('.btn--signup').innerText = 'Sign Up';
    signUpForm.reset();
  });
}

if (loginForm) {
  document.querySelector('.form')
          .addEventListener('submit', e => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            login(email, password);
          })
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value)
    form.append('email', document.getElementById('email').value)
    // const email = document.getElementById('email').value;
    // const name = document.getElementById('name').value;
    form.append('photo', document.getElementById('photo').files[0]);
    // console.log(form);
    
    updateSettings(form, 'data');
  })
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    
    await updateSettings(
        { passwordCurrent, password, passwordConfirm },
        'password'
    );
    
    document.querySelector('.btn--save-password').textContent = 'Save Password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  })
}

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  })
}

const alertMessage = document.querySelector('body').dataset.alert;
if (alert) {
  showAlert('success', alertMessage, 20);
}
