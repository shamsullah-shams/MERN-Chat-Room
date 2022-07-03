const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const Message = new Schema({
    message: {
        type: String,
        required: true,
    },
    // userName: {
    //     type: String,
    //     required: true
    // },
    // userId: {
    //     type: mongoose.Types.ObjectId,
    //     required: true
    // },
    // userImageUrl: {
    //     type: String,
    //     required: true,
    // }
}, { timestamps: true });


module.exports = mongoose.model('Message', Message);

