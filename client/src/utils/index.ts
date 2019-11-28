// const isObjectEmpty = (obj: Object) => Object.entries(obj).length === 0 && obj.constructor === Object;

const getUUIDv4 = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
  const r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8); // tslint:disable-line
  return v.toString(16);
});

const dajSocketId = (socketId: string) => {
  return socketId.split("#")[1];
};

const zlozSocketId = (namespace: string, socketId: string) => {
  return `${namespace}#${socketId}`;
};

export {
  // isObjectEmpty,
  getUUIDv4,
  dajSocketId,
  zlozSocketId,
};
