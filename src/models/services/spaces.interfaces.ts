import { ApiResponse } from "../api";
import { ISpace } from "../interfaces";


export interface IGetAllSpacesReq {
  // parámetros necesarios para la solicitud
}

export interface IGetAllSpacesResp extends ApiResponse<ISpace[]> {
}
