import { IBaseDTO } from "./IBaseDTO";

export interface IUzytkownik extends IBaseDTO {
  id: string; // UUID
  socketId: string;
  nazwa: string;
}
