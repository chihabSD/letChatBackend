  exports = module.exports = (io) => {

    io.on("connection", (socket) => {
        // console.log('socket connected', socket.id);
        socket.on('connectUser', (_id) => {
            console.log(_id);
        })
      });
  }