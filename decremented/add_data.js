// import module from db.js in models directory
const db = require('./models/db.js')

// name of collections
const userPost = 'userPost';
const userProfile = 'userProfile';
const userComments = 'userComments';

// call function createDatabase 
// db.createDatabase();

// // Atlas
// const MongoClient = require('mongodb').MongoClient;

// // replace the uri string with your connection string.
// const uri = "mongodb+srv://blycuasi:lasalle@cluster0-hinlh.mongodb.net/test?retryWrites=true&w=majority";
// MongoClient.connect(uri, function(err, client) {
//    if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//    }
//    console.log('Connected...');
//    const collection = client.db("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });
// // End of Atlas

// create/populate userProfile objects containing fields such as Username, Email, Password, DisplayPicture, CreditScore, SavedPostID, University, Bio
var user = {
    DisplayName: 'iravillanueva',
    Email: 'iravillanueva94@dlsu.edu.ph',
    Password: 'lasalle',
    DisplayPicture: 'human.jpg',
    CreditScore: '54',
    Bio: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and fe',
    fName: 'Ira',
    lName: 'Villanueva',
    // liked: [_id] //IRA TAMA BA TO ??? 
    //SavedPostID: '1',
    //University: 'DLSU',
}

// insert object user to collection 'userProfile'
db.insertOne(userProfile, user, function(){});

// var post = {
//     postNumber: '123',
//     postTitle: 'Cute guy sa henry grounds',
//     Username: 'luhzul101',
//     CreditScore: '60',
//     postBody: 'Shoutout nga pala dun sa cute guy na nakatambay sa henry grounds kanina mga 4 pm cute mo po',
//     postTags: '#lasalle',
//     Upvotes: '55'
// }

// // insert object user to collection 'userPost'
// db.insertOne(userPost, post);

var posts = [
    {
        timelineBadge: 'timeline-badge lasalle',
        uniBadge: '&#127993',
        navbar: 'navbar-dlsu',
        User: '',
        postTitle: 'Cute guy sa henry grounds',
        Username: 'iravillanueva',
        CreditScore: '60',
        postBody: 'Shoutout nga pala dun sa cute guy na nakatambay sa henry grounds kanina mga 4 pm cute mo po',
        postTags: '#lasalle', 
        Upvotes: '55',
        Upvote: 'upvote.png',
        Downvote: 'downvote.png',
    },

    {
        timelineBadge: 'timeline-badge ust',
        uniBadge: '&#128047',
        navbar: 'navbar-ust',
        User: '',
        postTitle: 'Dapitan Milktea',
        Username: 'ghoste101',
        CreditScore: '84',
        postBody: 'SOLID NUNG BAGONG MILKTEA MALAPIT SA DAPITAN??? TRY NIYO GUYS ???',
        postTags: '#ust #milktea',
        Upvotes: '398',
        Upvote: 'upvote.png',
        Downvote: 'downvote.png',
    },

    {
        timelineBadge: 'timeline-badge up',
        uniBadge: '&#9994',
        navbar: 'navbar-up',
        User: '',
        postTitle: 'Best Lib: Engg Lib',
        Username: 'iskolar101',
        CreditScore: '350',
        postBody: 'So ano ba talaga ang the best library sa diliman? engg lib parin mga sis :p',
        postTags: '#up #diliman #bestlib',
        Upvotes: '345',
        Upvote: 'upvote.png',
        Downvote: 'downvote.png',
    },

    {
        timelineBadge: 'timeline-badge ateneo',
        uniBadge: '&#x1f985',
        navbar: 'navbar-admu',
        User: '',
        postTitle: 'Weird Fetishes',
        Username: 'areneyow101',
        CreditScore: '601',
        postBody: 'What fetish will you keep a secret from the people you know IRL?',
        postTags: '#fetish',
        Upvotes: '99',
        Upvote: 'upvote.png',
        Downvote: 'downvote.png',
    }
]

db.insertMany(userPost,posts);

// db.dropCollection(userPost);
// db.dropCollection(userProfile);
// db.dropCollection('statusPost');

