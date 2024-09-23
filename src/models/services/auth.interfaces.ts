import { ApiResponse } from "../api";

export interface ILoginReq {
  doc_number: string;
  password: string;
}

export interface ILoginResp extends ApiResponse<{ token: string }> {
  as: string| undefined
}

