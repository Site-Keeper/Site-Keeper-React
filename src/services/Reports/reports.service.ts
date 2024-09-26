import { axiosJavaInstance, axiosJavaInstanceImage} from "../../axios.config";
import { IReport } from "../../models/interfaces/reports.interface";

import { ICreateReportReq, IGetSummaryReportsResp, IUpdateStatusReq } from "../../models/services/reports.interface";
import { REPORTS_API_ENDPOINTS, TEndpointKeys } from "./reports.endpoints";

const getEnpoint = (method: TEndpointKeys, id?: number): string => {
    return REPORTS_API_ENDPOINTS(id)[method];
};

export class ReportsService {
    static getAll = async (): Promise<IReport[]> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosJavaInstance.get<IReport[]>(endpoint).then(response => response.data);
    };

    static getSummary = async (): Promise<IGetSummaryReportsResp> => {
        const endpoint = getEnpoint("GET_SUMMARY");
        return await axiosJavaInstance.get<IGetSummaryReportsResp>(endpoint).then(response => response.data);
    };

    static getByTopic = async (req:{id:number}): Promise<IReport[]> => {
        const endpoint = getEnpoint("GET_BY_TOPIC", req.id);
        return await axiosJavaInstance.get<IReport[]>(endpoint).then(response => response.data);
    };

    static create = async (req: ICreateReportReq): Promise<IReport> => {
        const endpoint = getEnpoint("POST");
        return await axiosJavaInstanceImage.post<IReport>(endpoint, req).then(response => response.data);
    };

    static updateStatus = async (req: IUpdateStatusReq): Promise<IReport> => {
        const endpoint = getEnpoint("UPDATE_STATUS", req.id);
        return await axiosJavaInstanceImage.put<IReport>(endpoint, {status: req.status}).then(response => response.data);
    };

    static delete = async (id: number): Promise<IReport> => {
        const endpoint = getEnpoint("DELETE", id);
        return await axiosJavaInstanceImage.delete<IReport>(endpoint).then(response => response.data);
    };
    
}