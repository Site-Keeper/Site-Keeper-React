import { ApiResponse } from "../api";
import { ILostObject } from "../interfaces/lost-object.interface";

export interface IGetAllLostObjectsReq {}

export interface IGetAllLostObjectsRes extends ApiResponse<ILostObject[]> {}

