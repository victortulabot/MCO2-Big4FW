const sanitize = require('mongo-sanitize');
const fs = require('fs');
const Post = require('../models/PostModel');
const Profile = require('../models/ProfileModel');
const Comment = require('../models/CommentModel.js');
const Reply = require('../models/ReplyModel.js');
const db = require('../models/db.js');
const ReplyModel = require('../models/ReplyModel');

const helper = {
    sanitize: function (query) {
        return sanitize(query);
    },

    renamePost: function (req, newName) {
        var origName = req.file.originalname;
        var extension = origName.substring(origName.lastIndexOf('.'));
        const newURL = req.file.destination + '/' + newName + extension;

        fs.renameSync(req.file.path, newURL);
        return newName + extension;
    },

    updatePost: function(id, photo, res) {
        console.log("pls");
        console.log(id);
        let extension = photo.substring(photo.lastIndexOf("."));
        let filename = photo.split('.').slice(0, -1).join('.');

        db.updateOne(Post, {_id: id}, {photo, photo}, function(result){
            switch (extension) {
                case '.jpg':
                    fs.unlink('./public/posts/' + filename + '.png', (fds) => {});
                    fs.unlink('./public/posts/' + filename + '.jpeg', (fds) => {});
                    break;
                case '.png': 
                    fs.unlink('./public/posts/' + filename + '.jpg', (fds) => {});
                    fs.unlink('./public/posts/' + filename + '.jpeg', (fds) => {});
                    break;
                case '.jpeg':
                    fs.unlink('./public/posts/' + filename + '.png', (fds) => {});
                    fs.unlink('./public/posts/' + filename + '.jpg', (fds) => {});
                    break;
            }
        })
    },

    renameAvatar: function (req, newName) {
        var origName = req.file.originalname;
        var extension = origName.substring(origName.lastIndexOf('.'));
        const newURL = req.file.destination + '/' + newName + extension;

        fs.renameSync(req.file.path, newURL);
        return newName + extension;
    },

    updateAvatar: function(id, avatar, res) {
        console.log("pls");
        console.log(id);
        let extension = avatar.substring(avatar.lastIndexOf("."));
        let filename = avatar.split('.').slice(0, -1).join('.');

        db.updateOne(Profile, {_id: id}, {avatar, avatar}, function(result){
            switch (extension) {
                case '.jpg':
                    fs.unlink('./public/avatars/' + filename + '.png', (fds) => {});
                    fs.unlink('./public/avatars/' + filename + '.jpeg', (fds) => {});
                    break;
                case '.png': 
                    fs.unlink('./public/avatars/' + filename + '.jpg', (fds) => {});
                    fs.unlink('./public/avatars/' + filename + '.jpeg', (fds) => {});
                    break;
                case '.jpeg':
                    fs.unlink('./public/avatars/' + filename + '.png', (fds) => {});
                    fs.unlink('./public/avatars/' + filename + '.jpg', (fds) => {});
                    break;
            }
        })
        
        // Profile.updateOne({_id: id}, {avatar: avatar})
        //     .then((a) => {
        //         switch (extension) {
        //             case '.jpg':
        //                 fs.unlink('./public/avatars/' + filename + '.png', (fds) => {});
        //                 fs.unlink('./public/avatars/' + filename + '.jpeg', (fds) => {});
        //                 break;
        //             case '.png': 
        //                 fs.unlink('./public/avatars/' + filename + '.jpg', (fds) => {});
        //                 fs.unlink('./public/avatars/' + filename + '.jpeg', (fds) => {});
        //                 break;
        //             case '.jpeg':
        //                 fs.unlink('./public/avatars/' + filename + '.png', (fds) => {});
        //                 fs.unlink('./public/avatars/' + filename + '.jpg', (fds) => {});
        //                 break;
        //         }
        //     })
    },

    getAllPosts: function () {
        return Post.find()
            .populate('user')
            .populate({
                path: 'comments',
                options: { limit: 3, lean: true },
                populate: {
                    path: 'user',
                    options: { lean: true },
                },
            })
            .populate({
                path: 'comments',
                options: { limit: 3, lean: true },
                populate: {
                    path: 'replies',
                    options: { limit: 3, lean: true },
                    populate: {
                        path: 'user',
                        options: { lean: true},
                    }
                },
            })
            .sort('-created')
            .lean()
    },

    getDLSUPost: function () {
        return Post.find({university: 'DLSU'})
            .populate('user')
            .populate({
                path: 'comments',
                options: { limit: 3, lean: true },
                populate: {
                    path: 'user',
                    options: { lean: true },
                },
            })
            .populate({
                path: 'comments',
                options: { limit: 3, lean: true },
                populate: {
                    path: 'replies',
                    options: { limit: 3, lean: true },
                    populate: {
                        path: 'user',
                        options: { lean: true},
                    }
                },
            })
            .sort('-created')
            .lean()
    },

    getADMUPost: function () {
        return Post.find({university: 'ADMU'})
            .populate('user')
            .populate({
                path: 'comments',
                options: { limit: 3, lean: true },
                populate: {
                    path: 'user',
                    options: { lean: true },
                },
            })
            .populate({
                path: 'comments',
                options: { limit: 3, lean: true },
                populate: {
                    path: 'replies',
                    options: { limit: 3, lean: true },
                    populate: {
                        path: 'user',
                        options: { lean: true},
                    }
                },
            })
            .sort('-created')
            .lean()
    },

    getUPPost: function () {
        return Post.find({university: 'UP'})
            .populate('user')
            .populate({
                path: 'comments',
                options: { limit: 3, lean: true },
                populate: {
                    path: 'user',
                    options: { lean: true },
                },
            })
            .populate({
                path: 'comments',
                options: { limit: 3, lean: true },
                populate: {
                    path: 'replies',
                    options: { limit: 3, lean: true },
                    populate: {
                        path: 'user',
                        options: { lean: true},
                    }
                },
            })
            .sort('-created')
            .lean()
    },

    getUSTPost: function () {
        return Post.find({university: 'UST'})
            .populate('user')
            .populate({
                path: 'comments',
                options: { limit: 3, lean: true },
                populate: {
                    path: 'user',
                    options: { lean: true },
                },
            })
            .populate({
                path: 'comments',
                options: { limit: 3, lean: true },
                populate: {
                    path: 'replies',
                    options: { limit: 3, lean: true },
                    populate: {
                        path: 'user',
                        options: { lean: true},
                    }
                },
            })
            .sort('-created')
            .lean()
    },

    getUserPost: function (userId) {
        return Post.find({user: userId})
            .populate('user')
            .populate({
                path: 'comments',
                options: { limit: 3, lean: true },
                populate: {
                    path: 'user',
                    options: { lean: true },
                },
            })
            .populate({
                path: 'comments',
                options: { limit: 3, lean: true },
                populate: {
                    path: 'replies',
                    options: { lean: true },
                    populate: {
                        path: 'user',
                        options: { lean: true},
                    }
                },
            })
            .sort('-created')
            .lean()
    },

    getSavedPost: function (userId) {
         return Profile.find({_id: userId})
            .populate({
                path: 'postsSaved',
                populate: [{
                    path: 'user',
                    model: 'Profile'
                },
                {
                    path: 'comments',
                    model: 'Comment',
                    options: { limit: 3, lean: true },
                    populate: {
                        path: 'user',
                        options: { lean: true },
                    },
                }]
            })
            .sort('-created')
            .lean()
    }, 
    
    getComments: function(postId){
        return Comment.find({post: postId})
            .populate('user')
            .populate({
                path: 'replies',
                options: { limit: 3, lean: true },
                populate: {
                    path: 'user',
                    options: { lean: true },
                },
            })
            .sort('created')
            .lean()
    },

    getAllComments: function(postId){
        return Comment.find({post: postId})
            .populate('user')
            .populate({
                path: 'replies',
                options: { lean: true },
                populate: {
                    path: 'user',
                    options: { lean: true },
                },
            })
            .sort('created')
            .lean()
    },

    getReplies: function(postId){
        return Reply.find({comment: postId})
            .populate('user')
            .sort('created')
            .lean()
    }


};

module.exports = helper;