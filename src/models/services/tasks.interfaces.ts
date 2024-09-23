import { ApiResponse } from "../api";
import { IStatsTask } from "../interfaces/stats.interface";
import { ITask } from "../interfaces/task.interface";


export interface IGetTaskByRoutineReq {
  routine_id: number
}

export interface IGetTaskByRoutineResp extends ApiResponse<ITask[]> {

  total: number|undefined
}

export interface IGetStatisticsTaskResp extends ApiResponse<IStatsTask> {

  as: number|undefined
}
