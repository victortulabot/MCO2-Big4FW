
const db = require('../models/db.js');


const createPostController = {

    postCreate: function(req,res){


        var postTitle = req.body.postTitle;
        var post = req.body.post;
        var postTags = req.body.postTags;
        var uniBadge = req.body.universities;
        
        console.log(req.body.postTitle);

        var posts = {
            postTitle: postTitle,
            post: post,
            postTags: postTags,
            uniBadge: uniBadge

        }

        db.insertOne('userPost',posts,function(result){
            if(result){
                res.redirect('/HOME?postTitle=' + postTitle);
            }
        })

        

        
        
    },

    // likePost: function(req, res) {
    //     let username = req.session.user;
    //     let postId = req.body.postId;

    //     helper.likePost(postId, username, res);
    // },

    // unlikePost: function(req, res) {
    //     let username = req.session.user;
    //     let postId = req.body.postId;

    //     helper.unlikePost(postId, username, res);
    // },

}

module.exports = createPostController;

