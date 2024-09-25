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


export interface ICreateTaskReq {
  title: string
  description: string
  state: string
  space_id: number
  object_id?: number
  topic_id: string
  routine_id: number
  is_deleted: boolean
}

export interface ICreateTaskResp extends ApiResponse<ITask> {
  ALGO?: String | undefined 
}