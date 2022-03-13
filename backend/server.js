const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Voici le serveur node !');
});

server.listen(process.env.PORT || 3000);