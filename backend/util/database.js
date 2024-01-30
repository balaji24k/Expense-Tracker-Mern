const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

require('dotenv').config()

exports.mongoConnect = (callback) => {
  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      console.log("success");
      // console.log(result);
      db = client.db();
      callback();
    }).catch((err) => {
      console.log(err);
      throw err;
    });
}

exports.getDb = () => {
  if(db) {
    return db;
  }
  throw 'No Database Found!'
}