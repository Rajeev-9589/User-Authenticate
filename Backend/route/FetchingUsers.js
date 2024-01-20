const express = require("express");
const route = express.Router();
const UserSchema = require("../Models/RegisteringSchema");

route.get("/users/All", async (req, res) => {
  try {
    const allUsers = await UserSchema.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error: error.message });
  }
});

module.exports = route;
