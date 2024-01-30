const User = require('../models/user');
const jwt = require('jsonwebtoken'); 

const isInvalidString = (string) => {
  if(string === null || string.trim().length === 0) {
    return true;
  }
  return false;
}

exports.signup = async(req,res,next) => {
  try {
    console.log(req.body,"in signup");
    const { name,email,password } = req.body;
    if(isInvalidString(name) || isInvalidString(email) || isInvalidString(password)) {
      return res.status(400).json({message: "invalid inputs!, please enter valid details"});
    }
    const existingUser = await User.getUser(email);
    console.log(existingUser,"existing user");
    if(existingUser) {
      return res.status(400).json({message:"user already exists!"});
    }
    const user = new User(name,email,password);
    const result = await user.save();
    console.log(result,"inside controller");
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}

exports.login = async(req,res,next) => {
  try {
    console.log(req.body,"in login");
    const { email,password } = req.body;
    if(isInvalidString(email) || isInvalidString(password)) {
      return res.status(400).json({message: "invalid inputs!, please enter valid details"});
    };
    const user = await User.getUser(email);
    console.log(user,"existing user");
    if(!user) {
      return res.status(400).json({ message: "user does not exists!" });
    }
    if(password !== user.password) {
      return res.status(400).json({ message: "incorrect password!" });
    }
    const token = jwt.sign(user,"123456");
    return res.status(200).json({ email: user.email, name: user.name, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
}