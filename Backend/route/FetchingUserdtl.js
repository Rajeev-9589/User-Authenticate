const express = require("express");
const route = express.Router();
const Details = require("../Models/DetailsRegistering");
const RegisteringSchema =require("../Models/RegisteringSchema")

route.post("/users/Details", async (req, res) => {
  try {
    const{UserID}= req.query.userId;
    console.log( req.query.userId)
    const Details = await Details.findone({UserID:UserID})
    res.status(200).json(Details);
  } catch (error) {
    res.status(400).json({ message: "Error finding user", error: error.message });
  }
});

module.exports = route;
