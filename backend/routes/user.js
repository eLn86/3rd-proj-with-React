import express from 'express';

// Import Router
const router = express.Router();

// Import Controllers
import userController from '../controllers/userController';

router.post('/', userController.addPreference);

router.delete('/', userController.deletePreference);

// Export router for shared access
module.exports = router;
