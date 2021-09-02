const db = require('../models/db.js');
const helper = require('../helpers/helper.js');
const Profile = require('../models/ProfileModel');

const profileController = {
    // retrieve user profile based on the username request of the client defined in routes.js
    getProfile: function (req, res){
        var userId = helper.sanitize(req.params.userId);

        if(!req.session.user) res.redirect('/login');
        else{
            db.findOne(Profile, {_id: userId}, '', function(user){
                var getPost = helper.getUserPost(userId);
                getPost.exec(function(err, post){
                    // console.log("saved", post.length);

                    // var getSavedPost = helper.getSavedPost(userId);
                    // getSavedPost
                    // .exec(function(err, saves){
                    //     console.log("saved", user.postsSaved.length);

                    //     var sa=false;
                        var pa=false;
                   
                    //     if(user.postsSaved.length == 0){
                    //         sa = true
                    //     }

                        if(post.length == 0){
                            pa = true
                        }

                        if (err) throw err;
                        res.render('profile', {
                            active_session: req.session.user && req.cookies.user_sid,
                            active_user: req.session.user,
                            user: user.toObject(),
                            posts: post,
                            // display_save: saves[0].postsSaved,
                            // saved: user.postsSaved,
                            profile: true,
                            upvoted: user.postsUpVoted,
                            downvoted: user.postsDownVoted,
                            // sa: sa,
                            pa: pa
                        })
                    // })
                })
            })
        }
    },

    editProfile: function (req, res){
        var username = helper.sanitize(req.body.username);
        var fName = helper.sanitize(req.body.fName);
        var lName = helper.sanitize(req.body.lName);
        var bio = helper.sanitize(req.body.bio);

        if (!req.file) {
            db.updateOne(Profile, {_id: req.session.user}, {username: username, fName: fName, lName: lName, bio: bio}, function(result){
                if(result){
                    res.redirect(`/profile/${req.session.user}`);
                }
            })
        }

        // user uploaded his/her own avatar
        else {
            //rename user's uploaded avatar
            var newAvatarName = req.session.user;
            var avatarFileName = helper.renameAvatar(req, newAvatarName);

            helper.updateAvatar(newAvatarName, avatarFileName, res);

            db.updateOne(Profile, {_id: req.session.user}, {username: username, fName: fName, lName: lName, bio: bio}, function(result){
                if(result){
                    res.redirect(`/profile/${req.session.user}`);
                }
            })
        }     

    },

    checkUsername: function (req, res){
        // retrieve value of username stored in req.query object
        var username = req.query.username;
        console.log(username);

        // call the function findOne() from the module in db.js and use the object query to filter the collection 'Profile' in the database
        // sends an empty string if no result was found. otherwise, send an object containing 'Username'
        db.findOne(Profile, {username: username}, '', function(result){
            res.send(result);
        })

    },

    getIndivProfile: function (req, res){
        var userId = helper.sanitize(req.params.userId);

        if(!req.session.user) res.redirect('/login');
        else{
            db.findOne(Profile, {_id: userId}, '', function(user){
                var getPost = helper.getUserPost(userId);
                getPost.exec(function(err, post){
                    // var getSavedPost = helper.getSavedPost(userId);
                    // getSavedPost.exec(function(err, saves){
                    //     console.log(saves[0].postsSaved)
                        if (err) throw err;
                        res.render('profile', {
                            active_session: req.session.user && req.cookies.user_sid,
                            active_user: req.session.user,
                            user: user.toObject(),
                            posts: post,
                            // saved: user.postsSaved,
                            profile: false,
                            upvoted: user.postsUpVoted,
                            downvoted: user.postsDownVoted
                        })
                    // })
                })
            })

        }
    }

//     getUserProfile: function(req,res){
            
//         // retrieve the username parameter from the URL
//         var u = req.params.DisplayName;

//         // assign the retrieved username as an object 'query'
//         var querypost = {
//             Username: u
//         };

//         var queryuser = {
//             DisplayName: u
//         }

//         var projection = {
//             fName: 1,
//             lName: 1,
//             CreditScore: 1,
//             DisplayPicture: 1,
//             DisplayName: 1,
//             Bio: 1,
//         };

        
//         // call the function findOne() from the module in db.js and use the object query to filter the collection 'userProfile' in the database
//         // render 'profile.hbs' with the variables based on the result function filtered by the query object
//         db.findMany('userPost',querypost,function(posts){
//             db.find('userProfile', queryuser, projection, function(userDetails){
//             if(userDetails != null){
//                     res.render('profile',{
//                         fn: userDetails.fName, 
//                         ln: userDetails.lName, 
//                         cs: userDetails.CreditScore,
//                         bio: userDetails.Bio,
//                         posts: posts,
//                         image: userDetails.DisplayPicture,
//                         DisplayName: userDetails.DisplayName,
//                     });
//                 }
//                 else{
//                     res.send("error");
//                 }
//             })
//         }) 
//     },

//     // edit profile details
//     editProfile: function(req,res){
//         // retrieve the username parameter from the URL
//         var u = req.params.DisplayName;

//         // assign the retrieved username as an object 'query'
//         var queryuser = {
//             DisplayName: u
//         }

//         var projection = {
//             fName: 1,
//             lName: 1,
//             CreditScore: 1,
//             DisplayPicture: 1,
//             DisplayName: 1,
//             Bio: 1,
//         };

//         // call the function findOne() from the module in db.js and use the object query to filter the collection 'userProfile' in the database
//         // render 'editprofile.hbs' with the variables based on the result function filtered by the query object
//         db.find('userProfile', queryuser, projection, function(userDetails){
//             if(userDetails != null){
//                 res.render('editprofile',{
//                     fn: userDetails.fName, 
//                     ln: userDetails.lName, 
//                     cs: userDetails.CreditScore,
//                     Bio: userDetails.Bio,
//                     DisplayPicture: userDetails.DisplayPicture,
//                     DisplayName: userDetails.DisplayName,
//                 });
//             }
//             else{
//                 res.send("error");
//             }
//         })

//     },

//     // update profile details
//     updateProfile: function(req,res){
//         // retrieve the username parameter from the URL
//         var u = req.params.DisplayName;

//         // assign the retrieved username as an object 'query'
//         var queryuser = {
//             DisplayName: u
//         }

//         var projection = {
//             fName: 1,
//             lName: 1,
//             CreditScore: 1,
//             DisplayPicture: 1,
//             DisplayName: 1,
//             Bio: 1,
//             Email: 1,
//             Password: 1
//         };

//         // get the details to update
//         var fName = req.body.editFmame;
//         var lName = req.body.editLname;
//         var pic = req.body.upload;
//         var Bio = req.body.editbio;

//         // update profile.hbs
//         var update = {
//             $set: {
//             "fName": fName,
//             "lName": lName,
//             "DisplayPicture": pic,
//             "Bio": Bio
//             }
//         }

//         db.updateMany('userProfile',queryuser,update);
//         console.log("gumana");

//         // render updated profile.hbs
//         db.find('userProfile', queryuser, projection, function(userDetails){
//             if(userDetails != null){
//                 res.render('profile',{
//                     fn: userDetails.fName, 
//                     ln: userDetails.lName, 
//                     cs: userDetails.CreditScore,
//                     Bio: userDetails.Bio,
//                     DisplayPicture: userDetails.DisplayPicture,
//                     DisplayName: userDetails.DisplayName,
//                 });
//             }
//             else{
//                 res.send("error");
//             }
//         })
//     }
}

module.exports = profileController;
