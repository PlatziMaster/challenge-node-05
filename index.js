const express = require('express');
const app = express();

const { config } = require('./config/index');
const quotesApi = require('./routes/quotes.js');

// body parser
app.use(express.json());

// routes
quotesApi(app);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});