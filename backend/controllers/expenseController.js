const Expense = require("../models/expense");

exports.addExpense = async(req,res,next) => {
  try {
    console.log(req.body,"body in addexp controller");
    console.log(req.user,"user in addexp controller");

    const { expense, category, price } = req.body;
    const newExpense = new Expense(expense, category, price, req.user._id);
    const result = await newExpense.save();
    console.log(result,"expense post");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Error!" });
  }
}

exports.getExpenses = async(req,res,next) => {
  try {
    const expenses = await Expense.getExpenses(req.user._id);
    console.log(expenses,"expenses in getExp controller");
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({message: "Server Error!"});
  }
}

exports.deleteExpense = async(req,res,next) => {
  try {
    const { expenseId } = req.params;
    console.log(req.params,"param in del exp");
    const result = await Expense.deleteExpense(expenseId);
    console.log(result,"result in del exp controller");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: "Server Error!"});
  }
}

