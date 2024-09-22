import { ApiResponse } from "../api";
import { IUser } from "../interfaces";


export interface IGetAllUserReq {
  // parámetros necesarios para la solicitud
}

export interface IGetAllUserResp extends ApiResponse<IUser[]> {
}