// Import User from models
import User from '../model/User';

let homeController = {
  renderIndexPage: (req,res) => {
    res.render('index');
  }
}

module.exports = homeController;
