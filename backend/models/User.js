import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// define the schema for user
const userSchema = mongoose.Schema({

  facebook: String,
  twitter: String,
  google: String,
  tokens: Array,

  profile: {
    name: String,
    picture: String
  },
  preferences: Array,
  peerId: String
  
}, { timestamps: true });

// User Schema methods ======================

/**
 * Password hash middleware, encrypt the password by adding salt
 */
// userSchema.pre('save', (next) => {
//   const user = this;
//   if (!user.isModified('local.password')) { return next(); }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) { return next(err); }
//     bcrypt.hash(user.local.password, salt, null, (err, hash) => {
//       if (err) { return next(err); }
//       user.local.password = hash;
//       next();
//     });
//   });
// });

/**
 * Helper method for validating user's password.
 */
// userSchema.methods.validPassword = (candidatePassword, cb) => {
//   bcrypt.compare(candidatePassword, this.local.password, (err, isMatch) => {
//     cb(err, isMatch);
//   });
// };

// create the model for users
const User = mongoose.model('User', userSchema);

// Export User for shared access
module.exports = User;
