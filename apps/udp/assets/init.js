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
  $('#connection_btn').button('toggle');
  $('#connection_btn').button('complete');
}

function connect() {
  var that = $(this);
  that.unbind('click', connect);
  that.button('loading');
  BIERstorage.Node.connect(null, onConnect);
}

$(function() {
  KadOHui.init();

  var connectBtn = $('#connection_btn')
  connectBtn.button();
  connectBtn.click(connect);
});