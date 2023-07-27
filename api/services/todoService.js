// handles the logic of todo functions

const todoDao = require('../models/todoDao');

const create = async (user_id, title, body, due_date, status) => {
  const createTodo = await todoDao.create(user_id, title, body, due_date, status);
  return createTodo;
};
const tasks = async (user_id) => {
  const tasksTodo = await todoDao.tasks(user_id);
  return tasksTodo;
}
const edit = async (id, user_id, title, body, due_date, status) => {
  const editTodo = await todoDao.edit(
    id,
    user_id,
    title,
    body,
    due_date,
    status
  );
  return editTodo;
}

module.exports = {
  create,
  tasks,
  edit,
};
