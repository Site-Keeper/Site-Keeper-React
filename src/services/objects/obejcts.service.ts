import { axiosJavaInstance} from "../../axios.config";
import { IObject } from "../../models/interfaces";
import { ICreateObjectsReq } from "../../models/services/objects.interfaces";
import { OBJECTS_API_ENDPOINTS, TEndpointKeys } from "./objects.endpoints";

const getEnpoint = (method: TEndpointKeys): string => {
    return OBJECTS_API_ENDPOINTS()[method];
};

export class ObjectsService {
    static getAll = async (): Promise<IObject[]> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosJavaInstance.get<IObject[]>(endpoint).then(response => response.data);
    };

    static create = async (req: ICreateObjectsReq): Promise<IObject> => {
        const endpoint = getEnpoint("POST");
        return await axiosJavaInstance.post<IObject>(endpoint, null, {params : req}).then(response => response.data);
    };
}