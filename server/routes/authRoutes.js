const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleAuth, truecallerAuth, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);
router.post('/truecaller', truecallerAuth);
router.get('/me', protect, getMe);

module.exports = router;
