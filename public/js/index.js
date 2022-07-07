// import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap }    from './mapbox';
import { updateDate }    from './updateSettings';

// DOM Elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');

// delegation
if (mapBox) {
  // console.log(mapBox);
  let locations = JSON.parse(mapBox.dataset.locations);
  
  displayMap(locations);
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
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    
    updateDate(name, email);
  })
}
