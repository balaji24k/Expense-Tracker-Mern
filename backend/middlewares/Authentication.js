const User = require('../models/user');
const jwt = require("jsonwebtoken");

const authenticate = async(req,res,next) => {
  try {
    const { token } = req.headers;
    const data = jwt.verify(token,"123456");
    const user = await User.getUser(data.email);
    if(!user) {
      return res.status(400).json({ message: "authentication failed!" })
    };
    // console.log(user,"in middleware");
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = authenticate;