const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/user",userRoutes);
app.use("/expense",expenseRoutes);

mongoConnect(() => {
  app.listen(5000);
});


