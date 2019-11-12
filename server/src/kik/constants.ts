export enum SocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',

  //Rooms
  GET_ROOMS = 'get rooms',
  CREATE_ROOM = 'create room',
  JOIN_ROOM = 'join room',
  REFRESH_ROOMS = 'refresh rooms',

  //Game
  START_GAME = 'start game',
  MY_TURN = 'my turn',
  WIN = 'win',
  LOSE = 'lose',
}