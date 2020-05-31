const express = require('express');
const config = require('./config')
const bodyParser = require('body-parser');
const router = require('./routes/quotes')
const app = express();

const PORT = config.port

app.use(bodyParser.json())
app.use('/quote', router)

app.get('/', (request, response) => {
  response.send('¡Hola Mundo Cruel!')
})

app.listen(PORT, function () {
  console.log(`Servidor funcionando http://localhost:${PORT}`)
})