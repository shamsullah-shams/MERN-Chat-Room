const { validationResult } = require('express-validator');
const { redirect } = require('express/lib/response');
const Message = require('../model/message');
const io = require('../socket');


exports.getAllMessages = async (req, res, next) => {
    console.log('req');
    try {
        const allMessages = await Message.find();
        res.send([...allMessages]);
    } catch (error) {
        return res.status(500).send({ message: "Server Error" });
    }
}

exports.createMessage = async (req, res, next) => {
    const { message } = req.body;
    try {

        const newMessage = new Message({ message: message });
        await newMessage.save();

    } catch (error) {
        console.log(error);
    }
    res.send({ message });
    // const validationError = validationResult(req);
    // let error = '';
    // if (!validationError.isEmpty()) {
    //     let counter = 0;
    //     validationError.array().filter(vE => {
    //         counter++;
    //         error += counter + ":- " + vE.msg + "  "
    //     })
    //     return res.status(422).send({ message: error });
    // }

    // const { message, userId, userImageUrl, userName } = req.body;
    // try {
    //     const newMessage = new Message({
    //         message: message,
    //         userId: userId,
    //         userImageUrl: userImageUrl,
    //         userName: userName
    //     });
    //     const result = await newMessage.save();

    //     io.getIO().emit('messages', { action: 'newmessage', message: newMessage })
    //     return res.send(result);
    // } catch (error) {
    //     return res.status(500).send({ message: "Server Error" });
    // }
}

