const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// const { validateToken } = require('../middlewares/auth');

router.post('/signup', userController.signUp);

module.exports = {
  router,
};
