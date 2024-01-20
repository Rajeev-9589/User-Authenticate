const express = require("express");
const route = express.Router();
const multer = require("multer");
const DetailSchema = require("../Models/DetailsRegistering");

// Multer configuration for handling image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Define the destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use a unique filename for each uploaded image
  },
});

const upload = multer({ storage: storage });

route.post("/registerdetails", upload.single("image"), async (req, res) => {
  try {
    const { Name ,UserID } = req.body;
    console.log(req.body)

    if (!Name || !req.file) {
      return res.status(400).json({ message: "Please provide both Name and Image for registration" });
    }

    const newDetail = new DetailSchema({
      UserId:UserID,
      Name: Name,
      ImagePath: req.file.path, 
    });

    const savedDetail = await newDetail.save();

    console.log("Details has been registered successfully:", savedDetail);
    res.status(201).json({ message: "Details has been registered successfully", detail: savedDetail });
  } catch (error) {
    console.error("Error registering Details:", error);
    res.status(400).json({ message: "Error registering Details", error: error.message });
  }
});

// GET route for retrieving an image
route.get("/image/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = "./uploads/" + imageName;

  res.sendFile(imagePath);
});

module.exports = route;
