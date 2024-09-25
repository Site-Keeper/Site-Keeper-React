import { ApiResponse } from "../api";
import { IRoutine } from "../interfaces/routines.interface";



export interface IGetAllRoutinesResp extends ApiResponse<IRoutine[]> {
  total: number | undefined;
}

export interface IGetRoutinesByUserResp extends ApiResponse<IRoutine[]> {}