import { IBaseDTO } from "./IBaseDTO";
import { IGra } from "./IGra";

export interface IPokoj extends IBaseDTO {
  id: number;
  nazwa: string;
  gra: IGra;
}
