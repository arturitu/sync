/** CONFIGURATION **/
HOST = "http://localhost"
PORT = "3000"

/** CONFIGURATION **/

var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , redis = require('redis')
  , io = require('socket.io').listen(server);


io.set('log level', 1);  

server.listen(PORT);

io.configure( function() {
  io.set('close timeout', 60*60); // 1hr time out
});


//Based on this code https://github.com/steffenwt/nodejs-pub-sub-chat-demo
function SessionController (user) {
  this.sub = redis.createClient();
  this.pub = redis.createClient();
  
  this.user = user;
}

SessionController.prototype.subscribe = function(mychannel,socket) {
  this.sub.on('message', function(channel, message) {
    socket.emit(channel, message);
  });
  var current = this;
  this.sub.on('subscribe', function(channel, count) {
    var joinMessage = JSON.stringify({action: 'control', user: current.user, msg: ' joined the channel' });
    current.publish(mychannel,joinMessage);
  });
  this.sub.subscribe(mychannel);
};

SessionController.prototype.rejoin = function(mychannel, socket, message) {
  this.sub.on('message', function(channel, message) {
    socket.emit(channel, message);
  });
  var current = this;
  this.sub.on('subscribe', function(channel, count) {
    var rejoin = JSON.stringify({action: 'control', user: current.user, msg: ' rejoined the channel' });
    current.publish(mychannel,rejoin);
    var reply = JSON.stringify({action: 'message', user: message.user, msg: message.msg });
    current.publish(mychannel,reply);
  });
  this.sub.subscribe(mychannel);
};

SessionController.prototype.unsubscribe = function(channel) {
  this.sub.unsubscribe(channel);
};

SessionController.prototype.publish = function(channel,message) {
  this.pub.publish(channel, message);
};

SessionController.prototype.destroyRedis = function() {
  if (this.sub !== null) this.sub.quit();
  if (this.pub !== null) this.pub.quit();
};

io.sockets.on('connection', function (socket) { // the actual socket callback
  console.log(socket.id);

  socket.on('publish', function (channel,data) { // receiving chat messages
    var msg = JSON.parse(data);
    socket.get('sessionController', function(err, sessionController) {
      if (sessionController === null) {
        // implicit login - socket can be timed out or disconnected
        var newSessionController = new SessionController(msg.user);
        socket.set('sessionController', newSessionController);
        newSessionController.rejoin(socket, msg);
      } else {
        var reply = JSON.stringify({action: 'message', user: msg.user, msg: msg.msg });
        sessionController.publish(channel,reply);
      }
    });
    // just some logging to trace the chat data
    console.log(channel,data);
  });

  socket.on('join', function (channel,data) {
    var msg = JSON.parse(data);
    var sessionController = new SessionController(msg.user);
    socket.set('sessionController', sessionController);
    sessionController.subscribe(channel,socket);
    // just some logging to trace the chat data
    console.log(channel,data);
  });

  socket.on('disconnect', function(channel) { // disconnect from a socket - might happen quite frequently depending on network quality
    socket.get('sessionController', function(err, sessionController) {
      if (sessionController === null) return;
      sessionController.unsubscribe(channel);
      var leaveMessage = JSON.stringify({action: 'control', user: sessionController.user, msg: ' left the channel' });
      sessionController.publish(channel,leaveMessage);
      sessionController.destroyRedis();
    });
    console.log("desconectado");
  });
});

