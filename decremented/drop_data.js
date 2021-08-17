// import module from db.js in models directory
const db = require('./models/db.js')

// name of collections
const userPost = 'userPost';
const userProfile = 'userProfile';
const userComments = 'userComments';

// drop collection
db.dropCollection(userPost);
db.dropCollection(userProfile);
db.dropCollection(userComments);
