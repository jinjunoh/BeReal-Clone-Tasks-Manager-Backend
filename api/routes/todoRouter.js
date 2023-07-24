// configures endpoints to send to controllers
const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

const { validateToken } = require('../middlewares/auth');

router.post('/create', validateToken, todoController.create);
router.get('/tasks', validateToken, todoController.tasks);
router.patch('/edit', todoController.edit);

module.exports = {
  router,
};
