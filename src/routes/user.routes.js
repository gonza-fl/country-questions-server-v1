const router = require('express').Router();
const {
  registerUser,
  loginUser,
  verifyToken,
} = require('../controllers/user.controller');

router.post('/verifyToken', verifyToken);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
