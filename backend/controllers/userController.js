// Import User from models
import User from '../models/User';
import mongoose from 'mongoose';

let userController = {
  updatePreferences: (req, res) => {

    const id = req.body.id;
    const preferences = req.body.preferences;
    User.findByIdAndUpdate(id,
      {
        preferences: preferences
      }, {new: true}, (err, userUpdated) => {
       if (err) throw err;
       console.log('user preferences updated', userUpdated.preferences);
     })
  },

  getPreferences: (req, res) => {
    const id = req.body.id;
    User.findById(id, (err, user) => {
      res.json(user.preferences);
    })
  }
}

// Export userController to be used by index route
module.exports = userController;
