export enum SocketEvent {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
}

export enum UzytkownikSocketEvent {
  INIT = "init",
}

export enum KikSocketEvent {
  READY = "ready",
  MY_TURN = "my turn",
  OPPONENT_TURN = "opponent turn",
  MOVE = "move",
  END = "end",
}

export enum KikRoomSocketEvent {
  GET_ROOMS = "get rooms",
  GET_MY_ROOMS = "get my rooms",
  CREATE_ROOM = "create room",
  JOIN_ROOM = "join room",
  REFRESH_ROOMS = "refresh rooms",
}
