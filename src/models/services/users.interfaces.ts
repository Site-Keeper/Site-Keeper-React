import { ApiResponse } from "../api";
import { IUser } from "../interfaces";


export interface IGetStatisticsUserResp extends ApiResponse<unknown> {
  total: number;
  admin: number;
  perssonel: number;
  employed: number;
}

export interface IPostUsersReq {
  doc_numbers: number[]
  role_id: number
  perssonel_type: string|undefined
}

export interface IPostUsersResp extends ApiResponse<IUser[]> {
  total: number | undefined
}