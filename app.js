const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
// const port = 3008;
const changePdf = require("change-pdf");

const upload = multer({
  storage: multer.diskStorage({
    destination: "./oout",
    filename: function (req, file, cb) {
      cb(null, "random" + ".pdf");
    },
  }),
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (extname) {
      console.log("oye", file.originalname);
      return cb(null, true);
    } else {
      return cb("Error: Images Only!");
    }
  },
}).single("myImage");

app.set("views", "views");
app.set("view engine", "ejs");

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      const input = __dirname + "/oout/random.pdf";

      // fs.unlinkSync(__dirname + "/moo.pdf");
      changePdf.compressPdf(input, __dirname + "/download.pdf");
      res.send("File Uploaded Successfully");
    }
  });
});
app.get("/", (req, res) => {
  res.render("main");
});
app.get("/download", (req, res) => {
  return res.download(path.join(__dirname, "/download.pdf"), (err) => {
    if (err) {
      return res.status(404).send("<h1>Not found: 404</h1>");
    }
  });
});
app.listen(process.env.PORT || 3008, () => {
  console.log(`Server is running on port `);
});
