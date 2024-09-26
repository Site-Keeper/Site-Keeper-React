import { ApiResponse } from "../api";
import { ISpace } from "../interfaces";




export interface IGetAllSpacesResp extends ApiResponse<ISpace[]> {
  total: number | undefined;
}


export interface ICreateSpace {
  name: string
  location : string
  description : string
  image : File
}

export interface IUpdateSpace {
  name: string
  location : string
  description : string
  image? : File
}