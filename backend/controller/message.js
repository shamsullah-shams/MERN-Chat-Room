const { validationResult } = require('express-validator');
const { redirect } = require('express/lib/response');
const Message = require('../model/message');
const io = require('../socket');


// @@ ---- funciton that returns all messages to the client
exports.getAllMessages = async (req, res, next) => {
    try {
        const allMessages = await Message.find();
        res.send([...allMessages]);
    } catch (error) {
        return res.status(500).send({ message: "Server Error" });
    }
}

// @@ ---- function that creates a new message related to a special client
exports.createMessage = async (req, res, next) => {
    const validationError = validationResult(req);
    let error = '';
    // @@ ---- checking validation errors
    if (!validationError.isEmpty()) {
        let counter = 0;
        validationError.array().filter(vE => {
            counter++;
            error += counter + ":- " + vE.msg + "  "
        })
        return res.status(422).send({ message: error });
    }

    const { message, userId, userImageUrl, userName } = req.body;
    try {
        const newMessage = new Message({
            message: message,
            userId: userId,
            userImageUrl: userImageUrl,
            userName: userName
        });
        const result = await newMessage.save();
        // @@ ---- informing all connected users
        io.getIO().emit('messages', { action: 'newmessage', message: newMessage })
        return res.send(result);
    } catch (error) {
        return res.status(500).send({ message: "Server Error" });
    }
}

// @@ function for deleting a Message 
exports.deleteMessage = async (req, res, next) => {
    const validationError = validationResult(req);
    let error = '';
    // @@ ---- checking validation errors
    if (!validationError.isEmpty()) {
        let counter = 0;
        validationError.array().filter(vE => {
            counter++;
            error += counter + ":- " + vE.msg + "  "
        })
        // @@ ---- validation Error
        return res.status(422).send({ message: error });
    }
    const { _id } = req.body;
    try {
        const result = await Message.findOneAndDelete({ _id });
        // @@ ---- informing all connected users
        io.getIO().emit('messages', { action: 'newmessage', message: result })
        res.status(200).send({ message: "Deleted" });
    } catch (error) {
        return res.status(500).send({ message: "Server Error" });
    }
}

// @@ ---- function for updating a message
exports.updateMessage = async (req, res, next) => {
    const validationError = validationResult(req);
    let error = '';
    // @@ ---- checking validation errors
    if (!validationError.isEmpty()) {
        let counter = 0;
        validationError.array().filter(vE => {
            counter++;
            error += counter + ":- " + vE.msg + "  "
        })
        // @@ ---- validation Error
        return res.status(422).send({ message: error });
    }
    const { _id, message } = req.body;
    try {
        const result = await Message.findOneAndUpdate({ _id: _id }, { message: message });
        // @@ ---- informing all connected users
        io.getIO().emit('messages', { action: 'newmessage', message: result })
        res.status(200).send({ message: "Updatad" });
    } catch (error) {
        return res.status(500).send({ message: "Server Error" });
    }
}