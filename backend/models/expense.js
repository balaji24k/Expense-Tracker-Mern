const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Expense {
  constructor (expense, category, price, userId) {
    this.expense = expense,
    this.category = category,
    this.price = price,
    this.userId = userId
  }

  save () {
    const db = getDb();
    return db.collection("expenses").insertOne(this);
  }

  static getExpenses(userId) {
    const db = getDb();
    return db.collection("expenses").find({
      userId : new mongodb.ObjectId(userId) 
    }).toArray();
  }
  //   try {
  //     const db = getDb();
  //     const result = await db.collection("expenses").find({
  //       userId : new mongodb.ObjectId(userId) 
  //     }).toArray();
  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  static deleteExpense(expenseId) {
    const db = getDb();
    return db.collection("expenses").deleteOne({
      _id : new mongodb.ObjectId(expenseId) 
    });
  }
}

module.exports = Expense;