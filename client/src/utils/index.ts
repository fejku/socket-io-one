// const isObjectEmpty = (obj: Object) => Object.entries(obj).length === 0 && obj.constructor === Object;

const getUUIDv4 = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
  const r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8); // tslint:disable-line
  return v.toString(16);
});

export {
  // isObjectEmpty,
  getUUIDv4,
};
