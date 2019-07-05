//handles all of the
const CSVGen = require("./server").generateCSV;
const fs = require("fs");
let latestFile;
fs.readdir("./uploads", (err, files) => {
  if (err) throw err;
  latestFile = files[files.length - 1];
});

module.exports = {
  get: (req, res) => {
    console.log(`it's a get request`);
    res.send("yougot it boss");
  },
  post: (req, res, next) => {
    const file = `./uploads/`;
    const name = `${Date.now()}.csv`;
    const fileName = file + name;
    const output = CSVGen(req.body);
    fs.writeFile(fileName, output, (err, file) => {
      if (err) console.log(err);
      console.log(typeof file);
      res.send(`the latest file is ${name}, the old one is ${latestFile}`);
      latestFile = name;
    });
    console.log(output, "this is after parsing");
    // res.send("nofile");
  }
};
