const express = require("express");
const route = express.Router();
const UserSchema = require("../Models/RegisteringSchema");

route.post("/register", async (req, res) => {
  try {
    const { Userid, Pass } = req.body;

    if (!Userid || !Pass) {
      return res.status(400).json({ message: "Please provide both Userid and Pass for registration" });
    }

    const newUser = new UserSchema({
      userid: Userid,
      password: Pass,
    });

    const savedUser = await newUser.save();

    console.log("User registered successfully:", savedUser);
    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.log(req.body);
    console.error("Error registering user:", error);

    if (error.name === 'MongoError' && error.code === 11000) {
     
      return res.status(400).json({ message: "User with the provided userid already exists" });
    }

    res.status(400).json({ message: "Error registering user!!Make Sure You Entered UserID in Number format", error: error.message });
  }
});

module.exports = route;
