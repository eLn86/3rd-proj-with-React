import express from 'express';

// Import Router
const router = express.Router();

// Import Controllers
const homeController = require('../controllers/homeController');

/* GET index page. */
router.get('/', homeController.renderIndexPage);     //URL - http://localhost:3000/

module.exports = router;
