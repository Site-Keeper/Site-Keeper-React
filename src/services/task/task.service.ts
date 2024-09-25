import { axiosNestInstance} from "../../axios.config";
import { ICreateTaskReq, IGetStatisticsTaskResp, IGetTaskByRoutineResp } from "../../models/services/tasks.interfaces";
import { TASKS_API_ENDPOINTS, TEndpointKeys } from "./tasks.endpoints";

const getEnpoint = (method: TEndpointKeys, id: number | undefined): string => {
    return TASKS_API_ENDPOINTS(id)[method];
};

export class TasksService {
    static getTaskByRoutines = async (id : number): Promise<IGetTaskByRoutineResp> => {
        const endpoint = getEnpoint("GET_BY_ROUTINES", id);
        return await axiosNestInstance.get<IGetTaskByRoutineResp>(endpoint).then(response => response.data);
    };

    static getStats = async (): Promise<IGetStatisticsTaskResp> => {
        const endpoint = getEnpoint("GET_STATS", undefined);
        return await axiosNestInstance.get<IGetStatisticsTaskResp>(endpoint).then(response => response.data);
    };

    static postTask = async (req: ICreateTaskReq[]): Promise<IGetStatisticsTaskResp[]> => {
        const endpoint = getEnpoint("POST", undefined);
        return await axiosNestInstance.post<IGetStatisticsTaskResp[]>(endpoint, req).then(response => response.data);
    };
}   