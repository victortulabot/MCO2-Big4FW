const mongoose = require('mongoose');
const db = require('../models/db.js');
const { validationResult } = require('express-validator');
const helper = require('../helpers/helper.js');
const { ObjectID } = require('mongodb');
const Profile = require('../models/ProfileModel');
const Post = require('../models/PostModel');

const timelineController = {

    // retrieve all posts by finding all documents in Post collection
    getTimeline: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){
                var getPost = helper.getAllPosts();
                getPost.exec(function(err, post){
                    if (err) throw err;
                    var warn = false;
                    if(user.creditScore <= -50){
                        warn=true
                    }

                    post.sort(function (a, b) {
                        return b.user.creditScore-a.user.creditScore;
                    })

                    res.render('timeline', {
                        active_session: req.session.user && req.cookies.user_sid,
                        active_user: req.session.user,
                        user: user,
                        posts: post,
                        // saved: user.postsSaved,
                        upvoted: user.postsUpVoted,
                        downvoted: user.postsDownVoted,
                        warn: warn,
                        main: true,
                        popular: true, 
                    });
                })
            })
        }
    },

    getTimelineNewest: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){
                var getPost = helper.getAllPosts();
                getPost.exec(function(err, post){
                    if (err) throw err;
                    var warn = false;
                    if(user.creditScore <= -50){
                        warn=true
                    }

                    res.render('timeline', {
                        active_session: req.session.user && req.cookies.user_sid,
                        active_user: req.session.user,
                        user: user,
                        posts: post,
                        // saved: user.postsSaved,
                        upvoted: user.postsUpVoted,
                        downvoted: user.postsDownVoted,
                        warn: warn,
                        main: true
                    });
                })
            })
        }
    },

    // create a post to be inserted in the Post collection 
    createPost: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            var errors = validationResult(req);
            
            if (!errors.isEmpty()) {
                errors = errors.errors;

                var details = {};
                for (let i = 0; i < errors.length; i++){
                    // remove array indices for wildcard checks
                    details[`${errors[i].param.replace(/\[\d\]/g, '')}Error`] =
                    errors[i].msg;
                }

                db.findOne(Profile, {_id: req.session.user}, '', function(user){
                    var getPost = helper.getAllPosts();
                    getPost.exec(function(err, post){
                        if (err) throw err;
                        // console.log(post);

                        var warn = false;
                        if(user.creditScore <= -50){
                            warn=true
                        }

                        post.sort(function (a, b) {
                            return b.user.creditScore-a.user.creditScore;
                        })

                        res.render('timeline', {
                            active_session: req.session.user && req.cookies.user_sid,
                            active_user: req.session.user,
                            user: user,
                            posts: post,
                            saved: user.postsSaved,
                            upvoted: user.postsUpVoted,
                            downvoted: user.postsDownVoted,
                            details: details,
                        });
                    })
                })
            } 
            // if user didn't uploaded a photo
            else if(!req.file) {
                var title = helper.sanitize(req.body.title);
                var body = helper.sanitize(req.body.body);
                var tags = helper.sanitize(req.body.tags);
                var univ = helper.sanitize(req.body.university);


                const post = {
                    _id: new mongoose.Types.ObjectId(),
                    user: req.session.user,
                    title: title,
                    body: body,
                    tags: tags,
                    university: univ
                }

                db.updateOne(Profile,{_id: req.session.user}, {$inc: {creditScore: 5}}, function(user){
                    if(user){
                        db.insertOne(Post, post, function(flag){
                            if(flag){
                                res.redirect('/timeline');
                            }
                        })
                    }
                })
            }
            // if user uploaded a photo
            else {
                console.log("may file")
                var title = helper.sanitize(req.body.title);
                var body = helper.sanitize(req.body.body);
                var tags = helper.sanitize(req.body.tags);
                var univ = helper.sanitize(req.body.university);


                const post = {
                    _id: new mongoose.Types.ObjectId(),
                    user: req.session.user,
                    title: title,
                    body: body,
                    tags: tags,
                    university: univ
                }

                var newPostName = post._id;
                var postFileName = helper.renamePost(req, newPostName);
                post.photo = postFileName;

                console.log(post);

                db.updateOne(Profile,{_id: req.session.user}, {$inc: {creditScore: 5}}, function(user){
                    if(user){
                        db.insertOne(Post, post, function(flag){
                            if(flag){
                                res.redirect('/timeline');
                            }
                        })
                    }
                })
            }
        }   
    },

    getPostsSearch: function (req, res) {
        if(!req.session.user) res.redirect('/');
        else {
            var search = req.query.msg;
            console.log("search", search)
            Post
                .find({ tags: { $in: [search] } })
                .populate('user')
                .populate({
                    path: 'comments',
                    options: { limit: 3, lean: true },
                    populate: {
                        path: 'user',
                        options: { lean: true },
                    },
                })
                .sort('-created')
                .lean()
                .exec(function (err, postsArray) {
                    console.log("array", postsArray)
                    if (err) return next(err)

                    postsArray.sort(function (a, b) {
                        return b.user.creditScore-a.user.creditScore;
                    })

                    var pa=false;
                   
                    if(postsArray.length == 0){
                        pa = true
                    }

                    db.findOne(Profile, {_id: req.session.user}, '', function(user) {
                        res.render('timeline', {
                            active_session: req.session.user && req.cookies.user_sid,
                            active_user: req.session.user,
                            user: user,
                            posts: postsArray,
                            saved: user.postsSaved,
                            upvoted: user.postsUpVoted,
                            downvoted: user.postsDownVoted,
                            result: true,
                            msg: search,
                            pa: pa
                        });
                    })
                })
        }
    },

    deletePost: function (req, res) {
        var post_id = helper.sanitize(req.params.postId);
        var post_details = {
            _id: ObjectID(post_id)
        }

        db.updateOne(Profile, {_id: req.session.user}, {$inc: {creditScore: -5}}, function(user){
            if(user){
                db.deleteOne(Post, post_details, function(f){
                    if(f){
                        console.log('deleted: ', post_id)
                        res.redirect(`/profile/${req.session.user}`);
                    }

                });
            }

        })
    },

    // retrieve all DLSU posts in Post collection
    getDLSU: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){

                var getPost = helper.getDLSUPost();
                getPost.exec(function(err, post){
                    if (err) throw err;
                    var warn = false;
                    if(user.creditScore <= -50){
                        warn=true
                    }

                    post.sort(function (a, b) {
                        return b.user.creditScore-a.user.creditScore;
                    })
                    res.render('timeline', {
                        active_session: req.session.user && req.cookies.user_sid,
                        active_user: req.session.user,
                        user: user,
                        posts: post,
                        navbar: "navbar-dlsu",
                        saved: user.postsSaved,
                        upvoted: user.postsUpVoted,
                        downvoted: user.postsDownVoted,
                        warn: warn,
                        popular: true,
                        college: '/dlsu'
                    });
                })
            })
        }
    },

    getDLSUNewest: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){

                var getPost = helper.getDLSUPost();
                getPost.exec(function(err, post){
                    if (err) throw err;
                    var warn = false;
                    if(user.creditScore <= -50){
                        warn=true
                    }

                    res.render('timeline', {
                        active_session: req.session.user && req.cookies.user_sid,
                        active_user: req.session.user,
                        user: user,
                        posts: post,
                        navbar: "navbar-dlsu",
                        saved: user.postsSaved,
                        upvoted: user.postsUpVoted,
                        downvoted: user.postsDownVoted,
                        warn: warn,
                        college: '/dlsu'
                    });
                })
            })
        }
    },

    // retrieve all ADMU posts in Post collection
    getADMU: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){

                var getPost = helper.getADMUPost();
                getPost.exec(function(err, post){
                    if (err) throw err;
                    var warn = false;
                    if(user.creditScore <= -50){
                        warn=true
                    }

                    post.sort(function (a, b) {
                        return b.user.creditScore-a.user.creditScore;
                    })
                    res.render('timeline', {
                        active_session: req.session.user && req.cookies.user_sid,
                        active_user: req.session.user,
                        user: user,
                        posts: post,
                        navbar: "navbar-admu",
                        saved: user.postsSaved,
                        upvoted: user.postsUpVoted,
                        downvoted: user.postsDownVoted,
                        warn: warn,
                        college: '/admu',
                        popular: true
                    });
                })
            })
        }
    },

    getADMUNewest: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){

                var getPost = helper.getADMUPost();
                getPost.exec(function(err, post){
                    if (err) throw err;
                    var warn = false;
                    if(user.creditScore <= -50){
                        warn=true
                    }

                    res.render('timeline', {
                        active_session: req.session.user && req.cookies.user_sid,
                        active_user: req.session.user,
                        user: user,
                        posts: post,
                        navbar: "navbar-admu",
                        saved: user.postsSaved,
                        upvoted: user.postsUpVoted,
                        downvoted: user.postsDownVoted,
                        warn: warn,
                        college: '/admu',
                    });
                })
            })
        }
    },

    // retrieve all UP posts in Post collection
    getUP: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){

                var getPost = helper.getUPPost();
                getPost.exec(function(err, post){
                    if (err) throw err;
                    var warn = false;
                    if(user.creditScore <= -50){
                        warn=true
                    }

                    post.sort(function (a, b) {
                        return b.user.creditScore-a.user.creditScore;
                    })
                    res.render('timeline', {
                        active_session: req.session.user && req.cookies.user_sid,
                        active_user: req.session.user,
                        user: user,
                        posts: post,
                        navbar: "navbar-up",
                        saved: user.postsSaved,
                        upvoted: user.postsUpVoted,
                        downvoted: user.postsDownVoted,
                        warn: warn,
                        popular: true,
                        college: '/up'
                    });
                })
            })
        }
    },

    getUPNewest: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){

                var getPost = helper.getUPPost();
                getPost.exec(function(err, post){
                    if (err) throw err;
                    var warn = false;
                    if(user.creditScore <= -50){
                        warn=true
                    }

                    res.render('timeline', {
                        active_session: req.session.user && req.cookies.user_sid,
                        active_user: req.session.user,
                        user: user,
                        posts: post,
                        navbar: "navbar-up",
                        saved: user.postsSaved,
                        upvoted: user.postsUpVoted,
                        downvoted: user.postsDownVoted,
                        warn: warn,
                        college: '/up'
                    });
                })
            })
        }
    },

    // retrieve all UST posts in Post collection
    getUST: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){

                var getPost = helper.getUSTPost();
                getPost.exec(function(err, post){
                    if (err) throw err;
                    var warn = false;
                    if(user.creditScore <= -50){
                        warn=true
                    }

                    post.sort(function (a, b) {
                        return b.user.creditScore-a.user.creditScore;
                    })
                    res.render('timeline', {
                        active_session: req.session.user && req.cookies.user_sid,
                        active_user: req.session.user,
                        user: user,
                        posts: post,
                        navbar: "navbar-ust",
                        saved: user.postsSaved,
                        upvoted: user.postsUpVoted,
                        downvoted: user.postsDownVoted,
                        warn: warn,
                        popular: true,
                        college: '/ust'
                    });
                })
            })
        }
    },

    getUSTNewest: function (req, res){
        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Profile, {_id: req.session.user}, '', function(user){

                var getPost = helper.getUSTPost();
                getPost.exec(function(err, post){
                    if (err) throw err;
                    var warn = false;
                    if(user.creditScore <= -50){
                        warn=true
                    }

                    post.sort(function (a, b) {
                        return b.user.creditScore-a.user.creditScore;
                    })
                    res.render('timeline', {
                        active_session: req.session.user && req.cookies.user_sid,
                        active_user: req.session.user,
                        user: user,
                        posts: post,
                        navbar: "navbar-ust",
                        saved: user.postsSaved,
                        upvoted: user.postsUpVoted,
                        downvoted: user.postsDownVoted,
                        warn: warn,
                        college: '/ust'
                    });
                })
            })
        }
    },

    getIndivPost: function (req, res){
        var postId = helper.sanitize(req.params.postId);

        if(!req.session.user) res.redirect('/');
        else{
            db.findOne(Post, {_id: postId}, '', function(result){
                if(result){
                    result
                        .populate('user')
                        .execPopulate(function(err, post){
                            // console.log("hello");
                            // console.log(post);
                            db.findOne(Profile, {_id: req.session.user}, '', function(active_user){
                                var getComments = helper.getAllComments(postId);
                                getComments.exec(function(err, comments){
                                    var getReplies = helper.getReplies(postId);
                                    getReplies.exec(function(err, replies){
                                        res.render('indivpost', {
                                            active_session: req.session.user && req.cookies.user_sid,
                                            active_user: req.session.user,
                                            post: post.toObject(),
                                            user: active_user,
                                            saved: active_user.postsSaved,
                                            upvoted: active_user.postsUpVoted,
                                            downvoted: active_user.postsDownVoted,
                                            comments: comments
                                        })
                                    })
                                })
                            })
                        })
                }
            })

        }
    },

    uploadImage: function(req,res){
        
        var uploadPhoto = upload.single('picture');
        var img = fs.readFileSync(req.file.path);
        var encode_image = img.toString('base64');
         // Define a JSONobject for the image attributes for saving to database
          
         var finalImg = {
              contentType: req.file.mimetype,
              image:  new Buffer(encode_image, 'base64')
           };
        
        db.insertOne(finalImg, function(result){
            console.log(result)
            console.log('saved to database')
            res.redirect('/')
        })

    },

    // insertStatus: function(req, res){
    //     var postID = req.query.postID;
    //     var user = req.query.user;
    //     var upvote = req.query.upvote;
    //     var downvote = req.query.downvote;

    //     var status = {
    //         postID: postID,
    //         user: user,
    //         upvote: upvote,
    //         downvote: downvote
    //     }

    //     db.insertOne('statusPost', status, function(result){})

    //     var post = {};
    //     var query = {DisplayName: req.query.user};
    //     var projection = {
    //         fName: 1,
    //         lName: 1,
    //         CreditScore: 1,
    //         DisplayName: 1,
    //         DisplayPicture: 1,
    //     };

    //     var projectstatus = {postID: 1,_id: 0}  
    //     var queryupvote = {
    //         user: req.query.user,
    //         upvote: '1',
    //         downvote: '0'
    //     };

    //     var querydownvote = {
    //         user: req.query.user,
    //         upvote: '0',
    //         downvote: '1'
    //     }

    //     db.findManyP('statusPost', queryupvote, projectstatus, function(status){
    //         if(status.length != 0){
    //             console.log("meron");
    //             meron = 1;
    //             db.updateMany('userPost', {}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvote.png'}})
    //             status.forEach(function(i){
    //                 db.updateOne('userPost', {_id: ObjectId(i.postID)}, {$set: {"Upvote": 'upvoted.png', "Downvote": 'downvote.png'}})
    //              });
    //         }
    //         db.findManyP('statusPost', querydownvote, projectstatus, function(dstatus){
    //             if(dstatus.length != 0){
    //                 console.log("meron");
    //                 dstatus.forEach(function(i){
    //                     db.updateOne('userPost', {_id: ObjectId(i.postID)}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvoted.png'}})
    //                  });
    //             }
    //             else if(meron != 1){
    //                 console.log("wala");
    //                 db.updateMany('userPost', {}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvote.png'}})
    //             }
                
    //             db.findMany('userPost',post,function(posts){
    //                 db.find('userProfile', query, projection, function(userDetails){
    //                     res.render('timeline',{
    //                         fn: userDetails.fName, 
    //                         ln: userDetails.lName, 
    //                         cs: userDetails.CreditScore,
    //                         image: userDetails.DisplayPicture,
    //                         posts: posts,
    //                         DisplayName: req.query.user,
    //                     });
    //                 })
    //             })
    //         });     
    //     });
    // },

    // getStatus: function(req,res){
    //     var postID = req.query.postID;
    //     var user = req.query.user;
    //     var query = {
    //         postID: postID,
    //         user: user
    //     }

    //     console.log("get");
    //     console.log(postID)
    //     db.findOne('statusPost', query, function(result){
    //         res.send(result);
    //     })

    // },

    // updateStatus: function(req,res){
    //     var postID = req.query.postID;
    //     var user = req.query.user;
    //     var upvote = req.query.upvote;
    //     var downvote = req.query.downvote;
    //     var query = {
    //         postID: postID,
    //         user: user
    //     };

    //     console.log("update");
    //     console.log(req.query.yes);
    //     console.log(upvote);
    //     console.log(downvote);

    //     var update = {$set: {
    //         "upvote": upvote,
    //         "downvote": downvote
    //         }
    //     }

    //     db.updateOne('statusPost', query, update);

    //     var post = {};
    //     var query = {DisplayName: req.query.user};
    //     var projection = {
    //         fName: 1,
    //         lName: 1,
    //         CreditScore: 1,
    //         DisplayName: 1,
    //         DisplayPicture: 1,
    //     };

    //     var projectstatus = {postID: 1,_id: 0}  
    //     var queryupvote = {
    //         user: req.query.user,
    //         upvote: '1',
    //         downvote: '0'
    //     };

    //     var querydownvote = {
    //         user: req.query.user,
    //         upvote: '0',
    //         downvote: '1'
    //     }

    //     db.findManyP('statusPost', queryupvote, projectstatus, function(status){
    //         if(status.length != 0){
    //             console.log("meron");
    //             meron = 1;
    //             db.updateMany('userPost', {}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvote.png'}})
    //             status.forEach(function(i){
    //                 console.log("weh");
    //                 db.updateOne('userPost', {_id: ObjectId(i.postID)}, {$set: {"Upvote": 'upvoted.png', "Downvote": 'downvote.png'}})
    //              });
    //         }
    //         db.findManyP('statusPost', querydownvote, projectstatus, function(dstatus){
    //             if(dstatus.length != 0){
    //                 console.log("meron");
    //                 dstatus.forEach(function(i){
    //                     console.log("ay");
    //                     db.updateOne('userPost', {_id: ObjectId(i.postID)}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvoted.png'}})
    //                  });
    //             }
    //             else if(meron != 1){
    //                 console.log("wala");
    //                 db.updateMany('userPost', {}, {$set: {"Upvote": 'upvote.png', "Downvote": 'downvote.png'}})
    //             }
                
    //             db.findMany('userPost',post,function(posts){
    //                 db.find('userProfile', query, projection, function(userDetails){
    //                     res.render('timeline',{
    //                         fn: userDetails.fName, 
    //                         ln: userDetails.lName, 
    //                         cs: userDetails.CreditScore,
    //                         image: userDetails.DisplayPicture,
    //                         posts: posts,
    //                         DisplayName: req.query.user,
    //                     });
    //                 })
    //             })
    //         });     
    //     });
    // },

   

    // check: function(req, res){
    //     var email = req.query.Email;
    //     console.log(email);

    // },

    // updateUpvote: function (req,res){
    //     var upvotecount = req.query.Upvotes;
    //     console.log(upvotecount);
    // }

    // postVotes: function(req,res){

    //     var click = {clickTime: new Date()};

    //     db.insertOne('userPost', click, function(result){
    //         console.log('click added to db');
    //     })
    // },

    // getVotes: function(req,res){

    //     var post = {clickTime}

    //     db.find('userPost', post, function(result){
    //         res.send(result);
    //     })

    // }
    
}

module.exports = timelineController;