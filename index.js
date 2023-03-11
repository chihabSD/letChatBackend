require("dotenv").config();
const http = require('http')
const app = require("./src/app");
const socket = require("./src/socket");

const PORT = process.env.PORT || 5000;


const server = http.createServer(app)

const io = require('socket.io')(server, {cors: {origin: "*"}});
socket(io)
 server.listen(PORT, () => {
  console.log(`Server is ready for connections on port ${PORT}`);
});



module.exports = {io }