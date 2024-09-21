import { axiosNestInstance} from "../../axios.config";
import { IGetAllUserResp } from "../../models/services/users.interfaces";
import { ROUTINES_API_ENDPOINTS, TEndpointKeys } from "./routines.endpoints";

const getEnpoint = (method: TEndpointKeys): string => {
    return ROUTINES_API_ENDPOINTS()[method];
};

export class RoutinesService {
    static getAll = async (): Promise<IGetAllUserResp> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosNestInstance.get<IGetAllUserResp>(endpoint).then(response => response.data);
    };
}