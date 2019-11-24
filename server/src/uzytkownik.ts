export interface IUzytkownik {
  id: string, // UUID
  socketId: string,
}

export class Uzytkownik implements IUzytkownik {
  private _id: string;  
  private _socketId: string;

  constructor(id: string, socketId: string) {
    this._id = id;
    this._socketId = socketId;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get socketId(): string {
    return this._socketId;
  }
  public set socketId(value: string) {
    this._socketId = value;
  }  
}