export enum SocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',

  //Rooms
  GET_ROOMS = 'get rooms',
  CREATE_ROOM = 'create room',
  JOIN_ROOM = 'join room',
  REFRESH_ROOMS = 'refresh rooms',

  //Game
  READY = 'ready',
  MY_TURN = 'my turn',
  OPPONENT_TURN = 'opponent turn',
  MOVE = 'move',
  WIN = 'win',
  LOSE = 'lose',
}