export const dajSocketId = (socketId: string) => {
  return socketId.split("#")[1];
};

export const zlozSocketId = (namespace: string, socketId: string) => {
  return `${namespace}#${socketId}`;
};
