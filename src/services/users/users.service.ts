import { axiosNestInstance} from "../../axios.config";
import { IGetAllUserResp, IGetStatisticsUserResp } from "../../models/services/users.interfaces";
import { TEndpointKeys, USERS_API_ENDPOINTS } from "./users.endpoints";

const getEnpoint = (method: TEndpointKeys): string => {
    return USERS_API_ENDPOINTS()[method];
};

export class USersService {
    static getAll = async (): Promise<IGetAllUserResp> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosNestInstance.get<IGetAllUserResp>(endpoint).then(response => response.data);
    };

    static getStats = async (): Promise<IGetStatisticsUserResp> => {
        const endpoint = getEnpoint("GET_STATS");
        return await axiosNestInstance.get<IGetStatisticsUserResp>(endpoint).then(response => response.data);
    };
}