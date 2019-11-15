import { Gracz } from '.';
import { Gra } from '../gra/gra';

export class Pokoj { 
  private _gra: Gra;
  
  constructor(
    private _id: number,
    private _nazwa: string, 
    private gracz: string) 
  {    
    this._gra = new Gra(gracz);
  }

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
  public get gra(): Gra {
    return this._gra;
  }
  public set gra(value: Gra) {
    this._gra = value;
  }
}