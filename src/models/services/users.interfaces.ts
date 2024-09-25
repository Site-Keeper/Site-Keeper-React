import { ApiResponse } from "../api";
import { IUser } from "../interfaces";
import { IStatsUser } from "../interfaces/stats.interface";


export interface IGetAllUsersResp extends ApiResponse<IUser[]> {
  total: number | undefined
}


export interface IGetStatisticsUserResp extends ApiResponse<IStatsUser> {
  as : string | undefined
}

export interface IPostUsersReq {
  doc_numbers: number[]
  role_id: number
  perssonel_type: string|undefined
}

export interface IPostUsersResp extends ApiResponse<IUser[]> {
  total: number | undefined
}

export interface IUpdateUserReq {
  name?: string
  email?: string
  passaword?: string
}