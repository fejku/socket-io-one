var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const kikNsp = io.of('/kik');

kikNsp.on('connection', socket => {
  console.log('a user connected', socket.id);

  const dajPokoje = () => {
    const rooms = kikNsp.adapter.rooms;          
    const allRoomsNames = Object.keys(rooms);

    return allRoomsNames
      .filter(roomName => !roomName.startsWith('/kik#'))
      .map(room => ({
        nazwa: room,
        gracze: Object.keys(rooms[room].sockets),
      }));
  }

  socket.on('rooms', (callback) => {   
    callback(dajPokoje());
  });

  socket.on('create room', nazwaPokoju => {
    // TODO: sprawdzenie czy pokoj o takiej nazwie już istnieje
    socket.join(nazwaPokoju);
    kikNsp.emit('refresh rooms', dajPokoje());
  });

  socket.on('join room', nazwaPokoju => {
    console.log('join room', nazwaPokoju);
    // TODO: sprawdzenie czy nadal tylko jeden możliwe dołączenie do pokoju
    socket.join(nazwaPokoju);
    kikNsp.emit('refresh rooms', dajPokoje());
    //Jeśli dwóch graczy w pokoju
    kikNsp.to(nazwaPokoju).emit('start game');
  });

  socket.on('disconnect', () => {
    console.log("disconnected");    
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});