import { axiosJavaInstance} from "../../axios.config";
import { IReport } from "../../models/interfaces/reports.interface";
import { REPORTS_API_ENDPOINTS, TEndpointKeys } from "./reports.endpoints";

const getEnpoint = (method: TEndpointKeys): string => {
    return REPORTS_API_ENDPOINTS()[method];
};

export class ReportsService {
    static getAll = async (): Promise<IReport[]> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosJavaInstance.get<IReport[]>(endpoint).then(response => response.data);
    };
}