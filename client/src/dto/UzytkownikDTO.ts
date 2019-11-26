import { IUzytkownik } from "./../model/Uzytkownik";

export class UzytkownikDTO implements IUzytkownik {
  public id: string;
  public socketId: string;
  public nazwa: string;
}
