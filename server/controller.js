const CSVGen = require("./server").generateCSV;
const fs = require("fs");

const path = require("path");
let latestFile;
fs.readdir("./uploads", (err, files) => {
  if (err) throw err;
  latestFile = files[files.length - 1];
});

module.exports = {
  get: (req, res) => {
    console.log(`it's a get request`);
    fs.readdir("./uploads", (err, files) => {
      if (err) throw err;

      res.send({ message: files });
    });
  },
  post: (req, res, next) => {
    const file = `./uploads/`;
    const name = `${Date.now()}.csv`;
    const fileName = file + name;
    const output = CSVGen(req.body);
    fs.writeFile(fileName, output, (err, file) => {
      if (err) console.log(err);
      res.send(output);
      latestFile = name;
    });
    console.log(output, "this is after parsing");
  },
  download: (req, res) => {
    console.log("its a  download request", req.body);
    const opts = {
      // root: path.join(__dirname),
      dotfles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true
      }
    };
    res.sendFile(path.resolve("./uploads/" + req.body.text), opts, err => {
      if (err) throw err;
      console.log("sent");
    });
  }
};
