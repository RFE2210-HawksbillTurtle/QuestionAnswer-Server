const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const sequelize = require('./util/database.js');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  next();
});

app.use('/qa/questions', require('./routes/questions.js'));




(async () => {

  try {
    await sequelize.sync(
      {force: false}
    )
    await app.listen(process.env.PORT);
  } catch (err) {
    console.log(err);
  }

})()




