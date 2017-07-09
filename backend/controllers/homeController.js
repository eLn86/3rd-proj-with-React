// Import User from models
import User from '../models/User';

// Define homecontroller object containing home controller functions
let homeController = {
  renderIndexPage: (req,res) => {
    res.render('index');
  },
  getUserInfo: (req,res) => {
    const id = req.body.user; 
    res.json(user);
  }
}

// Export homeController to be used by index route
module.exports = homeController;
