const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require('fs')
const path = require('path')
//use api v1
// const auth = require("./routes/auth");



const app = express();
app.use(cors());

// -------- DB Config ------//

// go to process.env and get the mongo url
mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_DB_URL ||  "mongodb://localhost:27017/myride", {
  useNewUrlParser: true,
  
});

// when connection occurs execute the function and
mongoose.connection.on("connected", () => {
  console.log("Connected to database"); //display a message
});

//on error
mongoose.connection.on("error", err => {
  // if there is an error
  console.error(`Failed to connect to database: ${err}`); //display a message
});

// -------- Middlewares------//
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/images'));
// -------- Routes ------//
const dirPath = path.resolve(__dirname, './routes')
fs.readdirSync(dirPath).map((r) => app.use('/api', require('./routes/'+r)))

module.exports = app;