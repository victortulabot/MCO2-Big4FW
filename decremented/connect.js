
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://blycuasi:lasalle@cluster0-hinlh.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object   
//   client.close();
// });

const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb://victor:lasalle@cluster0-shard-00-00-fxgom.mongodb.net:27017,cluster0-shard-00-01-fxgom.mongodb.net:27017,cluster0-shard-00-02-fxgom.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});
