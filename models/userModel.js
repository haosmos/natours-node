const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:            {
    type:     String,
    required: [ true, 'Please tell us your name!' ]
  },
  email:           {
    type:      String,
    required:  [ true, 'Please provide your email' ],
    unique:    true,
    lowercase: true,
    validate:  [ validator.isEmail, 'Please provide a valid email' ]
  },
  photo:           String,
  password:        {
    type:      String,
    required:  [ true, 'Please provide a password' ],
    minlength: 4,
    select:    false
  },
  passwordConfirm: {
    type:     String,
    required: [ true, 'Please confirm your password' ],
    validate: {
      // this only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message:   'Password are not the same!'
    }
  },
  passwordChangedAt: Date
});

userSchema.pre('save', async function (next) {
  // only rnn this function if password was actually modified
  if (!this.isModified('password')) return next();
  
  // hash the password with cost of 12 (12 - cpu intensive)
  this.password = await bcrypt.hash(this.password, 12)
  
  // delete passwordsConfirm field
  this.passwordConfirm = undefined;
  next();
})

userSchema.methods.correctPassword =
    async function (candidatePassword, userPassword) {
      return await bcrypt.compare(candidatePassword, userPassword)
    }

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    
    // console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  
  // False means did NOT CHANGE!
  return false;
}

const User = mongoose.model('User', userSchema);

module.exports = User;