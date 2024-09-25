import { ApiResponse } from "../api";
import { IRoutine } from "../interfaces/routines.interface";



export interface IGetAllRoutinesResp extends ApiResponse<IRoutine[]> {
  total: number | undefined;
}

export interface ICreateRoutineReq {
  name: string;
  start_time: Date;
  end_time: Date;
  days: string[];
  assigned_to: number;
}


export interface ICreateRoutineResp extends ApiResponse<IRoutine> {
  total: number | undefined;
}