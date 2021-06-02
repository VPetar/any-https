const fs = require('fs');
const httpProxy = require('http-proxy');

var ip = require("ip");
var qrcode = require('qrcode-terminal');

const port = 3031
const portSource = 8081

httpProxy.createServer({
  target: {
    host: ip.address(),
    port: portSource
  },
  ssl: {
    key: fs.readFileSync('./fake-keys/privatekey.pem', 'utf8'),
      cert: fs.readFileSync('./fake-keys/certificate.pem', 'utf8')
  }
}).listen(port);

console.log('Source, targeted for HTTPS conversion: http://' + ip.address() + ':' + portSource)
console.log('Listening on https://' + ip.address() + ':' + port)
console.log('Use this QR to access via mobile apps:')
console.log('')
qrcode.generate('https://' + ip.address() + ':' + port, {small: true})
