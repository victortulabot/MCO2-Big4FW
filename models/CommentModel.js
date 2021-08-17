const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
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
        type: String,
        required: true
    },
    c_edited: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Comment', commentSchema);