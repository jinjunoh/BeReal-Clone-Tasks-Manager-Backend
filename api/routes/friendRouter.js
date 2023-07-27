// configures endpoints to send to controllers
const express = require('express');
const friendController = require('../controllers/friendController');

const router = express.Router();

const { validateToken } = require('../middlewares/auth');

// creates a friend
router.post('/create', validateToken, friendController.create);
// gets list of friends
router.get('/get', validateToken, friendController.get);

module.exports = {
  router,
};
