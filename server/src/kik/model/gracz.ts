export class Gracz {
  private _ready: boolean;
 
  constructor(private _id: string) {
    this._ready = false;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get ready(): boolean {
    return this._ready;
  }
  public set ready(value: boolean) {
    this._ready = value;
  }  
}