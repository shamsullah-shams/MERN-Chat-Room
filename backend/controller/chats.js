const { validationResult } = require('express-validator');
const Chat = require('../model/Chat');
const io = require('../socket');



// @@ ---- function that creates a new message related to a special client
exports.createChat = async (req, res, next) => {
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

    const { from, to, message } = req.body;

    try {
        const newChat = new Chat({
            from: from,
            to: to,
            message: message,
        });
        const result = await newChat.save();
        // @@ ---- informing all connected users
        io.getIO().emit('chats', { action: 'newChat', message: newChat })
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



// @@ ---- function for updating a message
exports.GetAllChats = async (req, res, next) => {
    const validationError = validationResult(req);
    let error = '';
    // @@ ---- checking validation errors
    if (!validationError.isEmpty()) {
        let counter = 0;
        validationError.array().filter(vE => {
            counter++;
            error += counter + ":- " + vE.msg + "  "
        });
        // @@ ---- validation Error
        return res.status(422).send({ message: error });
    }
    const { from, to } = req.body;
    try {
        const result = await Chat.find(
            {
                $or: [
                    { $and: [{ from: from }, { to: to }] },
                    { $and: [{ from: to }, { to: from }] }
                ]
            }
        ).sort({ createdAt: 1 });

        res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ message: "Server Error" });
    }
}