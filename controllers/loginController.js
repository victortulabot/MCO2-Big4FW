const bcrypt = require('bcrypt');
const db = require('../models/db');
const Profile = require('../models/ProfileModel');
const helper = require('../helpers/helper.js');

// define objects for client request functions for a certain path in the server
const loginController = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    // render log-in page when client requests '/login' defined in routes.js
    getLogIn: function (req,res) {    
        if(!req.session.user){
            res.render('login');
        }
        else{
            res.redirect('timeline')
        }
    },

    // executed when client requests '/login' for HTTP POST defined in routes.js
    postLogIn: function(req, res){
        var email = helper.sanitize(req.body.email);
        var password = helper.sanitize(req.body.password);

        if (email.trim() == '' || password == '') {
            res.render('login', {
                input: req.body,
                loginErrorMessage: 'Please input your email and password',
            });
        } else {
            db.findOne(Profile, { email: email }, '', function (user) {
                if (user) {
                    bcrypt.compare(password, user.password, function (
                        err,
                        equal,
                    ) {
                        if (equal) {
                            if(user.creditScore <= -100){
                                db.deleteOne(Profile, {_id: user._id}, function(u){
                                    if(u){
                                        console.log("user blocked");
                                        res.render('login', {
                                            warn: true
                                        });
                                    }
                                })
                            } else{
                                req.session.user = user._id;
                                res.redirect('/timeline');
                            }
                        } else {
                            res.render('login', {
                                input: req.body,
                                loginErrorMessage: 'Invalid email or password',
                            });
                        }
                    });
                } else {
                    res.render('login', {
                        input: req.body,
                        loginErrorMessage: 'Invalid email or password',
                    });
                }
            });
        }
    },
}

 // enables to export login controller object when called in another .js file
 module.exports = loginController;