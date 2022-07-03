const express = require('express');
const messageController = require('../controller/message');
const { body } = require('express-validator');
const router = express.Router();


router.get('/api/getmessages', messageController.getAllMessages);
router.post('/api/newmessage', messageController.createMessage);
// router.post('/api/newmessage',
// [
//     body('userId')
//         .trim()
//         .isMongoId()
//         .withMessage("Please Enter a mongodb id"),
//     body('message')
//         .trim()
//         .exists()
//         .withMessage("please Enter a message"),
//     body('userImageUrl')
//         .exists()
//         .withMessage("User Profile not found"),
//     body('userName')
//         .exists()
//         .withMessage("User Name should be provided"),

// ], messageController.createMessage);



module.exports = router;

