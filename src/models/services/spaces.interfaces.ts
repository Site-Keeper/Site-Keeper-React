import { ApiResponse } from "../api";
import { IRoutine } from "../interfaces/routines.interface";


export interface IGetAllRoutineReq {
  // parámetros necesarios para la solicitud
}

export interface IGetAllRoutineResp extends ApiResponse<IRoutine[]> {
}
