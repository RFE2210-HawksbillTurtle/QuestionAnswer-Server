const express = require('express');
const app = express();
require('dotenv').config({path: '../.env'});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,');
  next();
})




app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log(`App listening on port ${process.env.PORT}`);
})














const port = process.env.PORT || 3000;