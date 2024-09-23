import { ApiResponse } from "../api";
import { IReport } from "../interfaces/reports.interface";






export interface IGetSummaryReportsResp {
  total: number;
  approvedTotal : number;
  rejectedTotal : number;
}

export interface IGetAllReportsResp extends ApiResponse<IReport[]> {

  total: number| undefined;
}

