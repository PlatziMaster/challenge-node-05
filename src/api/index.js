const express = require('express');
const bodyParser = require('body-parser');

const { config } = require('../config.js');
const user = require('./components/user/network');
const post = require('./components/post/network');

const app = express();

app.use(bodyParser.json());
//Routes
app.use('/api/user', user);
app.use('/api/post', post)

app.listen(config.port, () => {
  console.log(`Api escuchando en el puerto ${config.port}`);
})
