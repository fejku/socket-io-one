export class Pokoj {
  constructor(
    private _nazwa: string, 
    private _gracze: string[]
  ) {}

  get nazwa(): string {
    return this._nazwa;
  }

  set nazwa(nazwa: string) {
    this._nazwa = nazwa;
  }

  get gracze(): string[] {
    return this._gracze;
  }

  set gracze(gracze: string[]) {
    this._gracze = gracze;
  }  
}