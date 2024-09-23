import { axiosNestInstance} from "../../axios.config";
import {  IGetAllUsersResp, IGetStatisticsUserResp, IPostUsersReq, IPostUsersResp } from "../../models/services/users.interfaces";
import { TEndpointKeys, USERS_API_ENDPOINTS } from "./users.endpoints";

const getEnpoint = (method: TEndpointKeys): string => {
    return USERS_API_ENDPOINTS()[method];
};

export class USersService {
    static getAll = async (): Promise<IGetAllUsersResp> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosNestInstance.get<IGetAllUsersResp>(endpoint).then(response => response.data);
    };

    static getStats = async (): Promise<IGetStatisticsUserResp> => {
        const endpoint = getEnpoint("GET_STATS");
        return await axiosNestInstance.get<IGetStatisticsUserResp>(endpoint).then(response => response.data);
    };

    static postUser = async (req: IPostUsersReq): Promise<IPostUsersResp> => {
        const endpoint = getEnpoint("POST");
        return await axiosNestInstance.post<IPostUsersResp>(endpoint, req).then(response => response.data);
    }
}