const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

module.exports = app;
