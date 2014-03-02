var io = require('socket.io').listen(1000);

nodes = {};

io.sockets.on('connection', function(socket) {
  socket.on("ping", function(data) {
    nodes[data.id] = data;
  });
});

setInterval(function() {
  console.log(nodes);
}, 5000);

var io2 = require('socket.io').listen(1001);
io2.sockets.on('connection', function(socket) {
  setInterval(function() {
    socket.emit("nodes", nodes);
  }, 5000);
});