import { ApiResponse } from "../api";
import { ILostObject } from "../interfaces/lost-object.interface";


export interface IGetAllLostObjectsRes extends ApiResponse<ILostObject[]> {

    total : number | undefined
}


export interface IGetLostObjectSummaryResp {
    total : number
    claimedTotal : number
    lostTotal : number
}


export interface ICreateLostObjectReq {
    name : string
    description : string
    spaceId : number
}