let http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200, { 'content-Type': 'text/plain' });
  response.end('¡Hola!');
}).listen(8000);

console.log('Servidor esta funcionando http://localhost:8000/')
