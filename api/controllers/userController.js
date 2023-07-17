// inputs/outputs of the information recived through RESTful API

const userService = require('../services/userService');
const { catchAsync } = require('../middlewares/error');

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

module.exports = {
  signUp,
  login,
};