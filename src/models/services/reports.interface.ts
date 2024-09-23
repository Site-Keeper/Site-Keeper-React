import { ApiResponse } from "../api";
import { IReport } from "../interfaces/reports.interface";


export interface IGetAllReportsReq {
  // parámetros necesarios para la solicitud
}

export interface IGetAllReportsResp extends ApiResponse<IReport[]> {
}


export interface IGetSummaryReportsResp {
  total: number;
  approvedTotal : number;
  rejectedTotal : number;
}