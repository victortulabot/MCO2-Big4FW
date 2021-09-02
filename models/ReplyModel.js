const mongoose = require('mongoose');

const replySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    reply:{
        type: String,
        required: true
    },
    r_edited: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Reply', replySchema);