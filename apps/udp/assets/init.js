var config = {
  bootstraps : ["127.0.0.1:3000", "127.0.0.1:3001", "127.0.0.1:3002"],
  reactor : {
    protocol  : 'jsonrpc2',
    type      : 'SimUDP',
    transport : {
      transports : [
        'flashsocket', 
        'htmlfile', 
        'xhr-multipart', 
        'xhr-polling', 
        'jsonp-polling'
      ]
    }
  }
};

var socket = io.connect('http://project.grigoroi.com:1345');

function onConnect() {

  node = BIERstorage.Node.node;
  socket.emit("ping", {id:node.getID(), address:node.getAddress()});

  KadOH.log.subscribeTo(node, 'Node');
  KadOH.log.subscribeTo(node._reactor, 'Reactor');
  KadOH.log.subscribeTo(node._reactor._transport, 'Transport');
  KadOH.log.subscribeTo(node._routingTable, 'RoutingTable');

  new KadOHui.Control(node);
  new KadOHui.Node(node, '#node');
  new KadOHui.Reactor(node._reactor, '#reactor .received', '#reactor .sent', '#reactor .connection_state');
  new KadOHui.Routing(node._routingTable, '#routing-table');
  new KadOHui.Transport(node._reactor._transport, '#transport>pre');
  new KadOHui.Logger(KadOH.log, '#log .console', '#log .control');
  new KadOHui.ValueM(node._store, '#value-management');
  $('#info').html('<h3>'+node.getAddress()+' / <small>'+node.getID()+'</small></h3>');
  $('#connection_btn').button('complete');//.button('toggle');
}

function connect() {
  var that = $(this);
  that.unbind('click', connect);

  BIERstorage.Node.connect(null, onConnect);
  that.button('toggle');
}

$(function() {
  KadOHui.init();

  var connectBtn = $('#connection_btn')
  connectBtn.button();
  connectBtn.click(connect);
});