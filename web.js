const httpServer = require('http-server');

const port = Number(process.env.PORT || 5000);
const server = httpServer.createServer({});

server.listen(port, '0.0.0.0', () => {
    console.log('Listening on port '+port+'...');
});
