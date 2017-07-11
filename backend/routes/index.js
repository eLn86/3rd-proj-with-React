import express from 'express';

// Import Router
const router = express.Router();

// Import Controllers
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';

import User from '../models/User';

/* GET index page. */
router.get('/', homeController.renderIndexPage);     //URL - http://localhost:3000/


router.get('/logout',(req,res,next)=>{
  req.logout();
  res.redirect('/');

});

// update preference on start button click 
router.put('/user', userController.updatePreferences);

/*Execute GET call for /home to get user data*/
router.get('/home', homeController.getUserInfo);


// Export router for shared access
module.exports = router;
