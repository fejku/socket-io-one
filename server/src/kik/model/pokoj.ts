import { Gracz } from '.';

export class Pokoj {
  constructor(
    private _id: number,
    private _nazwa: string, 
    private _gracze: Gracz[],
  ) {}

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  public get nazwa(): string {
    return this._nazwa;
  }
  public set nazwa(value: string) {
    this._nazwa = value;
  }
  public get gracze(): Gracz[] {
    return this._gracze;
  }
  public set gracze(value: Gracz[]) {
    this._gracze = value;
  }
}