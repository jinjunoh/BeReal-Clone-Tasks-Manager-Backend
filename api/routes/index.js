const express = require('express');

const userRouter = require('./userRouter');
const friendRouter = require('./friendRouter');

const router = express.Router();

router.use('/users', userRouter.router);
router.use('/friends', friendRouter.router)


module.exports = router;
