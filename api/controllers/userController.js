// inputs/outputs of the information recived through RESTful API

const userService = require('../services/userService');
const { catchAsync } = require('../middlewares/error');
const deleteUserById = catchAsync(async (req, res) => {
  const user_id = req.params.userId;
  if (!user_id) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await userService.deleteUserById(user_id);

  return res.status(201).json({
    message: 'DELETE_SUCCESS',
  });
})
const signUp = catchAsync(async (req, res) => {
  const {
    email,
    password,
    firstname,
    lastname,
    phone_number
  } = req.body;
  console.log(email, password, firstname, lastname, phone_number);
  if (
    !email ||
    !password ||
    !firstname ||
    !lastname ||
    !phone_number
  ) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await userService.signUp(
    email,
    password,
    firstname,
    lastname,
    phone_number
  );

  return res.status(201).json({
    message: 'SIGNUP_SUCCESS',
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const accessToken = await userService.login(email, password);
  //console.log(accessToken);
  return res.status(200).json({ accessToken });
});
const getUserById = catchAsync(async (req, res) => {
  const user_id = req.user.id;
  const { title, body, due_date, status } = req.body;
  if (!user_id) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }
  const user = await userService.getUserById(user_id);

  return res.status(201).json({
    user
  });
})

module.exports = {
  signUp,
  login,
  getUserById,
  deleteUserById,
};