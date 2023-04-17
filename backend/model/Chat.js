const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const Chat = new Schema({
    from: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "users"
    },
    to: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true });


module.exports = mongoose.model('Chat', Chat);

