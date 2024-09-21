import { axiosNestInstance} from "../../axios.config";
import { IGetTaskByRoutineResp } from "../../models/services/tasks.interfaces";
import { TASKS_API_ENDPOINTS, TEndpointKeys } from "./tasks.endpoints";

const getEnpoint = (method: TEndpointKeys, id: number | undefined): string => {
    return TASKS_API_ENDPOINTS(id)[method];
};

export class TasksService {
    static getTaskByRoutines = async (id : number): Promise<IGetTaskByRoutineResp> => {
        const endpoint = getEnpoint("GET_BY_ROUTINES", id);
        console.log(endpoint);
        return await axiosNestInstance.get<IGetTaskByRoutineResp>(endpoint).then(response => response.data);
    };
}