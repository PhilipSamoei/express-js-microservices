const express = require("express");


const app = express();

require("dotenv").config();

const cors = require("cors");

const { default: axios } = require("axios");

app.listen(5000, () => {

  console.log("server run nicely");
});
// app.use(cors);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors())

const TokenRoute= require("./routes/token") 

app.use("/token", TokenRoute)




app.get("/", (req, res) => {
  res.send("Mpesa backend");
});