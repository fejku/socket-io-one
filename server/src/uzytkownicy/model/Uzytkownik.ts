import { IUzytkownik } from "./../../model/IUzytkownik";

export class Uzytkownik implements IUzytkownik {
  private _id: string;
  private _socketId: string;
  private _nazwa: string;

  constructor(id: string, socketId: string, nazwa?: string) {
    this._id = id;
    this._socketId = socketId;
    this._nazwa = nazwa ? nazwa : "";
  }

  public dajDTO() {
    const dto = {
      id: this.id,
      nazwa: this.nazwa,
      socketId: this.socketId,
    } as IUzytkownik;

    return dto;
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
  public get nazwa(): string {
    return this._nazwa;
  }
  public set nazwa(value: string) {
    this._nazwa = value;
  }
}
