

var app = {
iniciar:function() {
$("#app").html(`<img src="img/carregar.gif" width="40" height="40" onclick="socket.emit('EnviarArduino', { user: 'a@a' , comando: 'status'})">`);
}
};