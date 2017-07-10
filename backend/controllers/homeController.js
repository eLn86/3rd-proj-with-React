// Import User from models
import User from '../models/User';

// Define homecontroller object containing home controller functions
let homeController = {
  renderIndexPage: (req,res) => {
    res.render('index');
  },

  logout: (req, res) => {
    req.logout();
    console.log('test');
    res.redirect('/');
  }
}

// Export homeController to be used by index route
module.exports = homeController;
