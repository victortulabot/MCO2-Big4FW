const db = require('../models/db.js');
const ObjectId = require('mongodb').ObjectID;

const indivpostController = {

    getIndivPost: function (req, res){
        var id = req.query._id;
        var user = {DisplayName: req.query.DisplayName};
        var details = {_id: ObjectId(id)};
        var comment = {PostID: id};

        // var update = {$set: {"User": req.query.DisplayName}}
        // db.updateMany('userComments', comments, update);
        console.log("indiv");
        db.findMany('userComments',comment,function(usercomment){
            db.findOne('userPost', details, function(result){
                db.findOne('userProfile', user, function(userPicture){
                    db.findOne('userProfile', {_id: req.session.user}, function(active_user){
                        if(result.uniBadge == '&#127993'){
                            res.render('indivpost',{
                                posts: result,
                                username: req.query.DisplayName,
                                navbar: "navbar-dlsu",
                                image: userPicture.DisplayPicture,
                                comments: usercomment,
                                cs: userPicture.CreditScore,
                                id: id,
                                user: active_user
                            });
                        }
            
                        else if(result.uniBadge == "&#x1f985"){
                            res.render('indivpost',{
                                posts: result,
                                username: req.query.DisplayName,
                                navbar: "navbar-admu",
                                image: userPicture.DisplayPicture,
                                comments: usercomment,
                                cs: userPicture.CreditScore,
                                id: id,
                                user: active_user
                            });
                        }
            
                        else if(result.uniBadge == "&#9994" ){
                            res.render('indivpost',{
                                posts: result,
                                username: req.query.DisplayName,
                                navbar: "navbar-up",
                                image: userPicture.DisplayPicture,
                                comments: usercomment,
                                cs: userPicture.CreditScore,
                                id: id,
                                user: active_user
                            });
                        }
            
                        else{
                            res.render('indivpost',{
                                posts: result,
                                username: req.query.DisplayName,
                                navbar: "navbar-ust",
                                image: userPicture.DisplayPicture,
                                comments: usercomment,
                                cs: userPicture.CreditScore,
                                id: id,
                                user: active_user
                            });
                        }
                    })
                })
            })   
        })
    },

    createComment: function(req,res){
        var query = {
            DisplayName: req.query.DisplayName      
        }
        
        var projection = {
            CreditScore: 1,
            DisplayPicture: 1,
        }

        db.find('userProfile', query, projection, function(user){
            var comments = {
                name: req.query.DisplayName,
                commentBody: req.query.commentBar,
                DisplayPicture: user.DisplayPicture,
                PostID: req.query.PostID,
                CreditScore: user.CreditScore,
            }
            
            db.insertOne('userComments', comments, function(result){
                res.render('partials/commentCard', comments, function(err,html){
                    res.send(html);
                })
            })
        })
    },

    insertStatus: function(req, res){
        var postID = req.query.postID;
        var user = req.query.user;
        var upvote = req.query.upvote;
        var downvote = req.query.downvote;

        var status = {
            postID: postID,
            user: user,
            upvote: upvote,
            downvote: downvote
        }

        db.insertOne('statusPost', status, function(result){})

    },

    getStatus: function(req,res){
        var postID = req.query.postID;
        var user = req.query.user;
        var query = {
            postID: postID,
            user: user
        }

        console.log("get");
        console.log(postID)
        db.findOne('statusPost', query, function(result){
            res.send(result);
        })

    },

    updateStatus: function(req,res){
        var postID = req.query.postID;
        var user = req.query.user;
        var upvote = req.query.upvote;
        var downvote = req.query.downvote;
        var query = {
            postID: postID,
            user: user
        };

        console.log("update");
        console.log(postID);
        console.log(req.query.yes);
        console.log(upvote);
        console.log(downvote);

        var update = {$set: {
            "upvote": upvote,
            "downvote": downvote
            }
        }

        db.updateOne('statusPost', query, update);

        if((upvote == 1) && (downvote == 0)){
            db.updateOne('userPost', {_id: ObjectId(postID)}, {$set: {"Upvote": 'upvoted.png', "Downvote": 'downvote.png'}})
        }
        else{
            db.updateOne('userPost', {_id: ObjectId(postID)}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvoted.png'}})
        }
    },
}

module.exports = indivpostController;