import { axiosNestInstance} from "../../axios.config";
import { IGetAllRoutineResp } from "../../models/services/spaces.interfaces";
import { ROUTINES_API_ENDPOINTS, TEndpointKeys } from "./routines.endpoints";

const getEnpoint = (method: TEndpointKeys): string => {
    return ROUTINES_API_ENDPOINTS()[method];
};

export class RoutinesService {
    static getAll = async (): Promise<IGetAllRoutineResp> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosNestInstance.get<IGetAllRoutineResp>(endpoint).then(response => response.data);
    };
}