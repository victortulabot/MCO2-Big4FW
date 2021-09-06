const db = require('../models/db.js');
const helper = require('../helpers/helper.js');
const Profile = require('../models/ProfileModel');

const realTimeController = {
    
    getOwnCS: function(req, res) {
        db.findOne(Profile, {_id: req.session.user}, '', function(user){
            var CS = user.creditScore.toString()
            res.send(CS);
        })
    },
}

module.exports = realTimeController;