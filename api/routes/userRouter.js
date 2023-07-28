// configures endpoints to send to controllers 
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

const { validateToken } = require('../middlewares/auth');

router.post('/signup', userController.signUp);
router.get('/login', userController.login);
router.get('/getUserById', validateToken, userController.getUserById);
router.delete('/delete/:userId', userController.deleteUserById);
module.exports = {
  router,
};
