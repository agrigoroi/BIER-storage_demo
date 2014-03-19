var io = require('socket.io').listen(1345);

nodes = {};

io.sockets.on('connection', function(socket) {
  socket.on("ping", function(data) {
    nodes[data.id] = data;
    socket.nodeID = data.id;
    socket.data = data.data;
  });
  socket.on('disconnect', function() {
    delete nodes[socket.nodeID];
  })
});

setInterval(function() {
  console.log(nodes);
}, 5000);

var io2 = require('socket.io').listen(1346);
io2.sockets.on('connection', function(socket) {
  setInterval(function() {
    socket.emit("nodes", nodes);
  }, 1000);
});