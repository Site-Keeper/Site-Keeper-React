import { ApiResponse } from "../api";
import { IRoutine } from "../interfaces/routines.interface";

export interface IGetAllRoutinesResp extends ApiResponse<IRoutine[]> {
  total: number | undefined;
}

export type IGetRoutinesByUserResp = ApiResponse<IRoutine[]>;

export type IGetTodayRoutine = ApiResponse<{todayRoutines: IRoutine}>;

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