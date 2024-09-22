import { ApiResponse } from "../api";
import { IReport } from "../interfaces/reports.interface";


export interface IGetAllReportsReq {}

export interface IGetAllReportsResp extends ApiResponse<IReport[]> {}
