require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const route = require("./routes/routes");
const connection = require("./models/connection");
const cookieParser = require('cookie-parser');
const app = express();


const PORT = process.env.PORT || 4000;

// middlewares
app.use(bodyParser.json())
app.use(cookieParser());
app.use(route);



// Server
const server = async () => {
  await app.listen(PORT, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log(`Listining on port ${PORT}`);
  });
};
server();
