const fs = require('fs');
const httpProxy = require('http-proxy');

var ip = require("ip");
var qrcode = require('qrcode-terminal');

const port = 3031

//
// Create the proxy server listening on port 443
//
// httpProxy.createServer({
//     ssl: {
//       key: fs.readFileSync('./fake-keys/privatekey.pem', 'utf8'),
//       cert: fs.readFileSync('./fake-keys/certificate.pem', 'utf8')
//     },
//     target: 'http://localhost:8081',
//     secure: true, // Depends on your needs, could be false.
//     // ws: true, 
//   }).listen(3031);

httpProxy.createServer({
  target: {
    host: 'localhost',
    port: 8081
  },
  ssl: {
    key: fs.readFileSync('./fake-keys/privatekey.pem', 'utf8'),
      cert: fs.readFileSync('./fake-keys/certificate.pem', 'utf8')
  }
}).listen(port);

console.log('Listening on https://' + ip.address() + ':' + port)
qrcode.generate('https://' + ip.address() + ':' + port, {small: true})
