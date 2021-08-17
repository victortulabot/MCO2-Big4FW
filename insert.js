
const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        

const url = "mongodb+srv://admin:big4user@big4fw.d5d5o.mongodb.net/big4fw?retryWrites=true&w=majority";

const client = new MongoClient(url);
 
 // The database to use
 const dbName = "big4";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const userProfile = db.collection("userProfile");
         const userPosts = db.collection("userPost")

         // Construct a document                                                                                                                                                              
         var user = {
            DisplayName: 'victortulabot',
            Email: 'victor_tulabot@dlsu.edu.ph',
            Password: 'lasalle',
            DisplayPicture: 'human.jpg',
            CreditScore: '10',
            Bio: 'Ayeeeeet!',
            fName: 'Victor',
            lName: 'Tulabot',
         }

         // Insert a single document, wait for promise so we can read it back
         const p = await userProfile.insertOne(user);
         // Find one document
         const myDoc = await userProfile.findOne();
         // Print to the console
         console.log(myDoc);

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
                Upvotes: '55'
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
                Upvotes: '398'
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
                Upvotes: '345'
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
                Upvotes: '99'
            }
        ]

        // Insert multiple document, wait for promise so we can read it back
        const q = await userPosts.insertMany(posts);
        // Find multiple document
        const myPosts = await userPosts.find();
        // Print to the console
        console.log(myPosts);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);