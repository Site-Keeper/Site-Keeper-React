import { axiosJavaInstance} from "../../axios.config";
import { IReport } from "../../models/interfaces/reports.interface";

import { IGetSummaryReportsResp } from "../../models/services/reports.interface";
import { REPORTS_API_ENDPOINTS, TEndpointKeys } from "./reports.endpoints";

const getEnpoint = (method: TEndpointKeys): string => {
    return REPORTS_API_ENDPOINTS()[method];
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
}