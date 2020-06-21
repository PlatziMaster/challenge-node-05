const express = require("express");
const bodyParser = require('body-parser');
const itemQuotes = require('./routes/api/quotes')

// app
const app = express();

// middlewares
app.use(bodyParser.json());

// routes
app.use("/api/quotes", itemQuotes);

// server
const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`);
});
