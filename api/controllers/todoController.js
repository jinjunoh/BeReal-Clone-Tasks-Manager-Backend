// inputs/outputs of the information recived through RESTful API

const todoService = require('../services/todoService');
const { catchAsync } = require('../middlewares/error');

// user_id INT NOT NULL,
//     title VARCHAR(200) NOT NULL,
//     body TEXT NOT NULL,
//     due_date DATE NOT NULL,
//     status BOOLEAN NOT NULL,

const create = catchAsync(async (req, res) => {
  const user_id = req.user.id;
  const {title, body, due_date, status} = req.body;
  if (!user_id || !title || !body || !due_date || !status) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await todoService.create(user_id, title, body, due_date, status);

  return res.status(201).json({
    message: 'CREATE_SUCCESS',
  });
});
const tasks = catchAsync(async (req, res) => {
  const user_id = req.user.id;
  if (!user_id) {
    const err = new Error('KEY_ERROR');
    err.statausCode = 400;
    throw err;
  }
  const tasks = await todoService.tasks(user_id);
  return res.status(201).json({
    tasks
  });
});

module.exports = {
  create,
  tasks,
};
