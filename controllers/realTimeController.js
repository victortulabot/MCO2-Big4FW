const db = require('../models/db.js');
const helper = require('../helpers/helper.js');
const Profile = require('../models/ProfileModel');
const Post = require('../models/PostModel.js');

const realTimeController = {
    
    getOwnCS: function(req, res) {
        db.findOne(Profile, {_id: req.session.user}, '', function(user){
            var CS = user.creditScore.toString()
            res.send(CS);
        })
    },

    getPD: function(req, res) {
        var getPost = helper.getAllPosts();
        getPost.exec(function(err, post){
            res.send(post)
        })
    },
}

module.exports = realTimeController;