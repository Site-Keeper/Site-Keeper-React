import { axiosNestInstance} from "../../axios.config";
import { IGetAllRoutinesResp, IGetRoutinesByUserResp } from "../../models/services/rotines.interfaces";
import { ROUTINES_API_ENDPOINTS, TEndpointKeys } from "./routines.endpoints";

const getEnpoint = (method: TEndpointKeys, id?: number): string => {
    return ROUTINES_API_ENDPOINTS(id)[method];
};

export class RoutinesService {
    static getAll = async (): Promise<IGetAllRoutinesResp> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosNestInstance.get<IGetAllRoutinesResp>(endpoint).then(response => response.data);
    };

    static getById = async (id: number): Promise<IGetRoutinesByUserResp> => {
        const endpoint = getEnpoint("GET_BY_USER", id);
        return await axiosNestInstance.get<IGetRoutinesByUserResp>(endpoint).then(response => response.data);
    };

    static getTodayRoutine = async (): Promise<IGetAllRoutinesResp> => {
        const endpoint = getEnpoint("GET_TODAY_ROUTINE");
        return await axiosNestInstance.get<IGetAllRoutinesResp>(endpoint).then(response => response.data);
    };
}