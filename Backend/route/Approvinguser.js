const express = require("express");
const route = express.Router();
const UserSchema = require("../Models/RegisteringSchema");

route.post("/Approve", async (req, res) => {
  try {
    const { Userid } = req.body;

    const user = await UserSchema.findOne({ userid: Userid });

    if (!user) {
      res.status(404).json({ message: "User Not Found!!" });
    } else {
      await UserSchema.findOneAndUpdate(
        { userid: Userid },
        { $set: { tag: "Authorised" } },
        { new: true }
      );

      res.status(200).json({ message: "User tag updated to Authorised" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating user tag", error: error.message });
  }
});

module.exports = route;
