const express = require("express");
const route = express.Router();
const UserSchema = require("../Models/RegisteringSchema");


route.post("/login", async(req, res) => {
 try {
    const { Userid, Pass } = req.body;

 if (!Userid || !Pass) {
      return res.status(400).json({ message: "Please provide both Userid and Pass for login" });
    }

    const user = await UserSchema.findOne({ userid: Userid ,password:Pass});

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.status(200).json({ message: "Login successful"});
 } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
 }
});

route.post("/register", async (req, res) => {
  try {
    const { Userid, Pass } = req.body;

    // Validate input data
    if (!Userid || !Pass) {
      return res.status(400).json({ message: "Please provide both Userid and Pass for registration" });
    }

    const newUser = new UserSchema({
      userid: Userid,
      password: Pass,
      tag:'Authorised'
    });

    const savedUser = await newUser.save();

    console.log("User registered successfully:", savedUser);
    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error registering user:", error);

    // Handle specific MongoDB validation error
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ message: "User with the provided username already exists" });
    }

    res.status(400).json({ message: "Error registering user", error: error.message });
  }
});

module.exports = route;
