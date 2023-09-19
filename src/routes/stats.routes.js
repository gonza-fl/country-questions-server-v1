const router = require('express').Router();
const {
  saveUserStats,
  getUserStats,
} = require('../controllers/stats.controller');

router.post('/save', saveUserStats);
router.get('/getStats', getUserStats);

module.exports = router;
