import { axiosNestInstance} from "../../axios.config";
import { ICreateRoutineReq, ICreateRoutineResp, IGetAllRoutinesResp } from "../../models/services/rotines.interfaces";
import { ROUTINES_API_ENDPOINTS, TEndpointKeys } from "./routines.endpoints";

const getEnpoint = (method: TEndpointKeys): string => {
    return ROUTINES_API_ENDPOINTS()[method];
};

export class RoutinesService {
    static getAll = async (): Promise<IGetAllRoutinesResp> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosNestInstance.get<IGetAllRoutinesResp>(endpoint).then(response => response.data);
    };

    static create = async (req: ICreateRoutineReq): Promise<ICreateRoutineResp> => {
        const endpoint = getEnpoint("POST");
        return await axiosNestInstance.post<ICreateRoutineResp>(endpoint, req).then(response => response.data);
    };
}