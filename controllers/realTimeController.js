const db = require('../models/db.js');
const helper = require('../helpers/helper.js');
const Profile = require('../models/ProfileModel');
const Post = require('../models/PostModel.js');

const realTimeController = {
    getSession: function(req, res){
        res.send(req.session.user);
    },

    getOwnCS: function(req, res) {
        if(req.session.user == null){
            
        }
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){
                var CS = user.creditScore.toString()
                res.send(CS);
            })
        }
        
    },

    getPD: function(req, res) {
        var getPost = helper.getAllPosts();
        getPost.exec(function(err, post){
            res.send(post);
        })
    },
}

module.exports = realTimeController;