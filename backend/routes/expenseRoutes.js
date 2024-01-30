const express = require('express');

const router = express.Router();

const authenticate = require("../middlewares/Authentication");
const expenseConroller = require("../controllers/expenseController");


router.use("/",authenticate);

router.post("/",expenseConroller.addExpense);

router.get("/",expenseConroller.getExpenses);

router.delete("/:expenseId",expenseConroller.deleteExpense);


module.exports = router;