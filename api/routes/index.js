const express = require('express');

const userRouter = require('./userRouter');
const todoRouter = require('./todoRouter');
const friendRouter = require('./friendRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/friend', friendRouter.router)
router.use('/todo', todoRouter.router);

module.exports = router;
