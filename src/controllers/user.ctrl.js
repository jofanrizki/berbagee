const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;


const test = async (req,res) => {
  User.find()
  .then(data=> {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      massage: err.massage || "Some error occured"
    });
  });
};


const register = async(req, res) => {
    
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
      res.status(400).send({ message: "All input is required!" });
  }

  const oldUser = await User.findOne({ email });
  if (oldUser){
      res.status(400).send({ message: "User already exists!" });
  }
  else {

      encryptedPassword = await bcrypt.hash(password, 10);
      const user = new User({
          username,
          email,
          password: encryptedPassword,
          role
      });

      const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
              expiresIn: "2h"
          }
      );
      user.token = token;

      user.save((err, result) => {
          if (err){
              res.status(500).send({ message: "Error Save Data!" });
          }
          else{
              res.status(201).json(result);
          }
      });
  }
 
}
const login = async(req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    res.status(400).send("All input is required");
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(200).json(user);
  }
  else{
      res.status(400).send("Invalid Credentials");
  }
  
}

module.exports = {
    register,
    login,
    test
}