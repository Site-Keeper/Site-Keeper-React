import { axiosNestInstance} from "../../axios.config";
import { ICreateRoutineReq, ICreateRoutineResp, IGetAllRoutinesResp, IGetRoutinesByUserResp, IGetTodayRoutine, IUpdateRoutineReq } from "../../models/services/rotines.interfaces";
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

    static getTodayRoutine = async (): Promise<IGetTodayRoutine> => {
        const endpoint = getEnpoint("GET_TODAY_ROUTINE");
        return await axiosNestInstance.get<IGetTodayRoutine>(endpoint).then(response => response.data);
    };

    static create = async (req: ICreateRoutineReq): Promise<ICreateRoutineResp> => {
        const endpoint = getEnpoint("POST");
        return await axiosNestInstance.post<ICreateRoutineResp>(endpoint, req).then(response => response.data);
    };

    static update = async (req: IUpdateRoutineReq, id: number): Promise<ICreateRoutineResp> => {
        const endpoint = getEnpoint("UPDATE", id);
        return await axiosNestInstance.patch<ICreateRoutineResp>(endpoint, req).then(response => response.data);
    };
}