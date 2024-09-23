import { ApiResponse } from "../api";
import { IUser } from "../interfaces";



export interface IGetAllUserResp extends ApiResponse<IUser[]> {
  total: number | undefined;
}