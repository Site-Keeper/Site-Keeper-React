import { ApiResponse } from "../api";
import { ISpace } from "../interfaces";




export interface IGetAllSpacesResp extends ApiResponse<ISpace[]> {
  total: number | undefined;
}
