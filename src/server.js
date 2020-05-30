const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const { config } = require('../config');

const dbUrl = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;
const PORT = config.port;
let db;

app.use(bodyParser.json());

MongoClient.connect(dbUrl, {
  useUnifiedTopology: true
}, (err, database) => {
  if (err) return console.error(err);
  console.log('Connected to Database');
  db = database;
});

app.get('/', (request, response) => {
  response.send('¡Hola Mundo Cruel!');
});

app.get('/quotes', (request, response) => {
  const data = db.db('platzi-quotes');
  data.collection('quotes').find().toArray()
    .then(results => {
      response.json({ results })
    })
    .catch(err => console.log(err));
});

app.post('/addquote', (request, response) => {
  console.log(request.body);
  response.json(request.body);
});

app.listen(PORT, function () {
  console.log(`Servidor funcionando http://localhost:${PORT}`)
});