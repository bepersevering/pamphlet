let express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  users = [];



/*
 * specify the html we will use
 * app.use('/', express.static(__dirname + '/www'));
 * bind the server to the 80 port
 * server.listen(3000);//for local test
 */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => { console.log(`listen at ${PORT}`); });// publish to heroku
/*
 * server.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000);//publish to openshift
 * console.log('server started on port'+process.env.PORT || 3000);
 * handle the socket
 */
io.sockets.on('connection', (socket) => {
  // new user login
  socket.on('login', (nickname) => {
    if (users.indexOf(nickname) > -1) {
      socket.emit('nickExisted', nickname, users);
    } else {
      // socket.userIndex = users.length;
      socket.nickname = nickname;
      users.push(nickname);
      socket.emit('loginSuccess', nickname, users);
      io.sockets.emit('system', nickname, users, 'login');
    }
  });
  // user leaves
  socket.on('disconnect', () => {
    if (socket.nickname != null) {
      // users.splice(socket.userIndex, 1);
      users.splice(users.indexOf(socket.nickname), 1);
      socket.broadcast.emit('system', socket.nickname, users, 'logout');
    }
  });
  // new message get
  socket.on('postMsg', (msg, color) => {
    console.log(msg);
    socket.broadcast.emit('newMsg', socket.nickname, msg, color);
  });
  // new image get
  socket.on('img', (imgData, color) => {
    socket.broadcast.emit('newImg', socket.nickname, imgData, color);
  });
});
