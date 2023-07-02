require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const route = require("./routes/routes");
const connection = require("./models/connection");
const app = express();


const PORT = process.env.PORT || 4000;

// middlewares
app.use(bodyParser.json())
app.use(route);


// Server
const server = async () => {
  await connection(process.env.HOST,process.env.USER,"",process.env.DATABASE);
  await app.listen(PORT, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log(`Listining on port ${PORT}`);
  });
};

server();
