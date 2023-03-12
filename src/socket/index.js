exports = module.exports = (io) => {
  let users = [];

  const addUser = (userId, socketId, userInfo) => {
    const CheckUser = users.some((user) => user.userId === userId);
    if (!CheckUser) {
      users.push({ userId, userInfo, socketId });
    }
  };

  let interval;

  io.on("connection", (socket) => {
    // Register user 
    socket.on("registerUser", ({ account, socketId }) => {
        addUser(account._id, socketId, account)
        
      console.log("user connected", account.username, socketId);
      io.emit("connectedUsers", users);
      console.log('current users connected', users.map(user => user.socketId));
    });

    // When the user leave the system remove him
    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
        // io.emit("userDisconnected", socket.id);
      let filteredUsers =   users.filter(user => user.socketId != socket.id)
        console.log('after a user left', filteredUsers.map(user => user.socketId));
        io.emit("userDisconnected", filteredUsers);
        // clearInterval(interval);
      });
    
  });
};


