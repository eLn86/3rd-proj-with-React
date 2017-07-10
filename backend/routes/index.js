import express from 'express';

// Import Router
const router = express.Router();

// Import Controllers
import homeController from '../controllers/homeController';

/* GET index page. */
router.get('/', homeController.renderIndexPage);     //URL - http://localhost:3000/


router.get('/logout',(req,res,next)=>{

  req.logout();
  res.redirect('/');

});



/*Execute GET call for /home to get user data*/
router.get('/home', homeController.getUserInfo);


// Export router for shared access
module.exports = router;
