const express = require('express');
const messageController = require('../controller/message');
const { body } = require('express-validator');
const router = express.Router();

// @@ ---- route for return all messages to the users
router.get('/api/getmessages', messageController.getAllMessages);
// @@ ---- route for deleting a message 
router.post('/api/message/delete', [
    body('_id')
        .trim()
        .isMongoId()
        .withMessage('MongoDB Id is Required')
], messageController.deleteMessage)

// @@ ---- route for updating a message 
router.post('/api/message/update',
    [
        body('_id')
            .trim()
            .isMongoId()
            .withMessage('id is required'),
        body('userId')
            .trim()
            .isMongoId()
            .withMessage("Please Enter a mongodb id"),
        body('message')
            .trim()
            .exists()
            .withMessage("please Enter a message"),
        body('userImageUrl')
            .exists()
            .withMessage("User Profile not found"),
        body('userName')
            .exists()
            .withMessage("User Name should be provided"),

    ], messageController.updateMessage);




// @@ ---- route for creating new message
router.post('/api/newmessage',
    [
        body('userId')
            .trim()
            .isMongoId()
            .withMessage("Please Enter a mongodb id"),
        body('message')
            .trim()
            .exists()
            .withMessage("please Enter a message"),
        body('userImageUrl')
            .exists()
            .withMessage("User Profile not found"),
        body('userName')
            .exists()
            .withMessage("User Name should be provided"),

    ], messageController.createMessage);



module.exports = router;

