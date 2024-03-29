const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes.js");

const port = 1337;

const app = express();
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use("/", router);

//serve the html
//you have to close the directory inorder to go back out
app.use(express.static(__dirname + "/../"));

//initiate static server
app.listen(port, () => {
  console.log(`server running port: ${port}`);
});
