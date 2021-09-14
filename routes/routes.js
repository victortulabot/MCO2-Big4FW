// IMPORT
const express = require('express'); //EXPRESS
const session = require('express-session'); //EXPRESS-SESSIONS
const database = require('../models/db.js'); //CONNECT DB

const cookieParser = require('cookie-parser'); //COOKIES
const bodyParser = require('body-parser'); //BODY PARSING
var multer = require('multer'); //FILE UPLOAD
const validation = require('../helpers/validation.js'); //FORM VALIDATION

// import login controller
const loginController = require('../controllers/loginController.js');

// import sign up controller
const signUpController = require('../controllers/signUpController.js');

// import timeline controller
const timelineController = require('../controllers/timelineController.js');

// import profile controller
const profileController = require('../controllers/profileController.js');

// import helper controller
const postHelperController = require('../controllers/postHelperController.js');

// import realtime controller
const realTimeController = require('../controllers/realTimeController.js');

const app = express();

// initialize multer for file upload use 
var avatarStorage = multer.diskStorage({
    destination: function (req, file, cd) {
        if (file.fieldname === 'avatar') {
            cd(null, './public/avatars');
        }
    },
    filename: function (req, file, cd) {
        cd(null, file.originalname);
    },
});

var avatarUpload = multer({ storage: avatarStorage }).single('avatar');

// initialize multer for file upload use in posts
var postStorage = multer.diskStorage({
    destination: function (req, file, cd) {
        if (file.fieldname === 'upload') {
            cd(null, './public/posts');
        }
    },
    filename: function (req, file, cd) {
        cd(null, file.originalname);
    },
});

var postUpload = multer({ storage: postStorage }).single('upload');


// Init Cookie and Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Init Sessions
app.use(
    session({
        key: 'user_sid', //user session id
        secret: 'lifecouldbedream',
        resave: false,
        saveUninitialized: true,
        store: database.sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 Day.
        },
    }),
);

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});


// loginController
// app.get('/favicon.ico', loginController.getFavicon);
app.get('/', loginController.getLogIn);
app.post('/', loginController.postLogIn);

// signUpController
app.get('/signup', signUpController.getSignUp);
app.post('/signup', 
    avatarUpload,
    validation.signupValidation(),
    signUpController.postSignUp
);

// timelineController
app.get('/timeline', timelineController.getTimeline);
app.get('/timeline/newest', timelineController.getTimelineNewest);
app.post('/createPost', 
    postUpload,
    validation.createPostValidation(),
    timelineController.createPost);
app.get('/timeline/dlsu', timelineController.getDLSU);
app.get('/timeline/dlsu/newest', timelineController.getDLSUNewest);
app.get('/timeline/admu', timelineController.getADMU);
app.get('/timeline/admu/newest', timelineController.getADMUNewest);
app.get('/timeline/up', timelineController.getUP);
app.get('/timeline/up/newest', timelineController.getUPNewest);
app.get('/timeline/ust', timelineController.getUST);
app.get('/timeline/ust/newest', timelineController.getUSTNewest);
app.get('/timeline/search', timelineController.getPostsSearch);
app.get('/post/:postId', timelineController.getIndivPost);
app.get('/post/delete/:postId', timelineController.deletePost);

// profileController
app.get('/profile/:userId', profileController.getProfile);
app.post('/editProfile',
    avatarUpload,
    validation.signupValidation(),
    profileController.editProfile);
app.get('/checkUsername', profileController.checkUsername);
app.get('/userid/:userId', profileController.getIndivProfile);


// app.post('/uploadphoto', timelineController.uploadImage);

// indivpostController
// app.get('/indivPost', indivpostController.getIndivPost);
// app.get('/createComment', indivpostController.createComment);

// timelineController for Universities
// app.get('/ADMU', timelineController.getADMU);
// app.get('/DLSU', timelineController.getDLSU);
// app.get('/UP', timelineController.getUP);
// app.get('/UST', timelineController.getUST);
// app.get('/getStatus', timelineController.getStatus);
// app.get('/insertStatus', timelineController.insertStatus);
// app.get('/updateStatus', timelineController.updateStatus);

// profileController
// app.get('/profile/:DisplayName', profileController.getUserProfile);
// app.get('/editprofile/:DisplayName', profileController.editProfile);
// app.get('/editprofile/:DisplayName', profileController.updateProfile);

// postHelperController
// app.get('/post/save/:postId', postHelperController.savePost);
// app.get('/post/unsave/:postId', postHelperController.unsavePost);
app.post('/post/upvote', postHelperController.upvotePost);
app.post('/post/unupvote', postHelperController.unupvotePost);
app.post('/post/downvote', postHelperController.downvotePost);
app.post('/post/undownvote', postHelperController.undownvotePost);

// app.get('/post/upvote/:postId', postHelperController.upvotePost);
// app.get('/post/downvote/:postId', postHelperController.downvotePost);
// app.get('/post/unupvote/:postId', postHelperController.unupvotePost);
// app.get('/post/undownvote/:postId', postHelperController.undownvotePost);

app.get('/createComment', postHelperController.createComment);
app.post('/editPost',
    postUpload,
    validation.createPostValidation(),
    postHelperController.editPost);
app.post('/editComment', postHelperController.editComment);
// WIP
app.get('/replyComment', postHelperController.replyComment);
app.post('/editReply', postHelperController.editReply);
app.get('/reply/delete/:replyId/:id/:commentid', postHelperController.deleteReply);
// WIP
app.get('/comment/delete/:commentId/:id', postHelperController.deleteComment);

// realTimeController
app.get('/getSession', realTimeController.getSession);
app.get('/getOwnCS', realTimeController.getOwnCS);
app.get('/getpostDetails', realTimeController.getPD);

//logout
app.get('/logout', function (req, res) {
    req.logout;
    req.session.destroy(function (err) {});
    res.redirect('/');
});

app.use((req, res, next) => {
    if (req.session.user) {
      res.status(404).redirect('/timeline');
    }
    else {
      res.status(404).redirect('/');
    }
});

//app.get('/updateUpvote', timelineController.updateUpvote);

// call function getUserProfile when client requests a username (parameter) che

// app.get('/check', timelineController.check);

//app.post('/HOME', createPostController.postCreate);

// app.post('/clicked', timelineController.postVotes);

// app.get('/clicks', timelineController.getVotes);

// enables to export app object when called in another .js file
module.exports = app;