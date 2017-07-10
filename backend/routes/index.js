import express from 'express';

// Import Router
const router = express.Router();

// Import Controllers
import homeController from '../controllers/homeController';

/* GET index page. */
router.get('/', homeController.renderIndexPage);     //URL - http://localhost:3000/
router.get('/logout', homeController.logout);
// Export router for shared access
module.exports = router;
