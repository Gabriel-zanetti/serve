var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(80);
  app.get("*" , function (req, res) {
  res.sendFile(__dirname + '/site'+ req.params[0] );
console.log(req.params[0]);
});

//app.get("/:id/:nome" ,function(req, res){
//res.sendFile(__dirname + '/site/js/');
//conaole.log(req.params.nome);
//});



io.on('connection', function (socket) {
	 socket.on('EnviarArduino', function(msg){
    io.emit(msg.user , msg.comando);
    console.log(msg.user);
    console.log(msg.comando);
  }).on('EnviarCliente', function(msg){
    io.emit(msg.user , msg.comando);
    console.log(msg.user);
    console.log(msg.comando);
  });
});
