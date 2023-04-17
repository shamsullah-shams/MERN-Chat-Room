const express = require('express');
const chatController = require('../controller/chats');
const { body } = require('express-validator');
const router = express.Router();

// router.post('/', chatController.getAllMessages);


// @@ ---- route for deleting a message 
router.post('/api/message/delete', [
    body('_id')
        .trim()
        .isMongoId()
        .withMessage('MongoDB Id is Required')
], chatController.deleteMessage)



// @@ ---- route for return all messages to the users
router.post('/', [
    body('from')
        .trim()
        .isMongoId()
        .withMessage('From User Id is Required'),
    body('to')
        .trim()
        .isMongoId()
        .withMessage('To User Id is Required'),
], chatController.GetAllChats)

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

    ], chatController.updateMessage);




// @@ ---- route for creating new message
router.post('/create',
    [
        body('from')
            .trim()
            .isMongoId()
            .withMessage("Please Enter a mongodb id"),
        body('to')
            .trim()
            .isMongoId()
            .withMessage("Please Enter a mongodb id"),
        body('message')
            .trim()
            .exists()
            .withMessage("please Enter a message"),

    ], chatController.createChat);



module.exports = router;

