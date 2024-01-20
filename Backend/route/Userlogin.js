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


module.exports = route;
