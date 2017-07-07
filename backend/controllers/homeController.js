// Import User from models
import User from '../models/User';

let homeController = {
  renderIndexPage: (req,res) => {
    res.render('index');
  }
}

module.exports = homeController;
