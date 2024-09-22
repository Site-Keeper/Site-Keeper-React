import { axiosJavaInstance} from "../../axios.config";
import { IGetAllReportsResp } from "../../models/services/reports.interface";
import { REPORTS_API_ENDPOINTS, TEndpointKeys } from "./reports.endpoints";

const getEnpoint = (method: TEndpointKeys): string => {
    return REPORTS_API_ENDPOINTS()[method];
};

export class ReportsService {
    static getAll = async (): Promise<IGetAllReportsResp> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosJavaInstance.get<IGetAllReportsResp>(endpoint).then(response => response.data);
    };
}