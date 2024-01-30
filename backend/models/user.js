const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
  constructor(name,email,password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  async save() {
    try {
      const db = getDb();
      const result = await db.collection("users").insertOne(this);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async getUser(email) {
    try {
      const db = getDb();
      // const _id = new mongodb.ObjectId(userId);
      const user = await db.collection("users").findOne({email});
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = User;