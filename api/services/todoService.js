// handles the logic of user functions

const todoDao = require('../models/todoDao');

const create = async (user_id, title, body, due_date, status) => {
  const createTodo = await todoDao.create(user_id, title, body, due_date, status);
  return createTodo;
};

module.exports = {
    create,
};
