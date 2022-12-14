const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 3008;

const upload = multer({
  storage: multer.diskStorage({
    destination: "./oout", // Storage location
    // filename: "random",
    filename: function (req, file, cb) {
      cb(null, Date.now() + ".jpg"); //Appending extension
    },
  }),
  limits: { fileSize: 20000000 },
  // This limits file size to 2 million bytes(2mb)    fileFilter:
  fileFilter: (req, file, cb) => {
    // Create regex to match jpg and png
    const fileTypes = /jpg|jpeg|png/;

    // Do the regex match to check if file extenxion match
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (fileTypes && extname) {
      // Return true and file is saved
      return cb(null, true);
    } else {
      // Return error message if file extension does not match
      return cb("Error: Images Only!");
    }
  },
}).single("myImage");

app.set("views", "views");
app.set("view engine", "ejs");

app.post("/upload", (req, res) => {
  // This is the response sent to the user in the browser once the file recieved
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
      // This will display the error message to the user
    } else {
      res.send("File Uploaded Successfully");
      // This shows the file has beem successfully uploaded
      // The image will be found in the public folder
    }
  });
});
app.get("/", (req, res) => {
  res.render("main");
});
// Create the server and let it run on the port 3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
