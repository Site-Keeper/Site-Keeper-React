import { axiosJavaInstance } from "../../axios.config";
import { ILostObject } from "../../models/interfaces/lost-object.interface";
import { LOST_OBJECTS_API_ENDPOINTS, TEndpointKeys } from "./lost-objects.endpoints";

const getEnpoint = (method: TEndpointKeys): string => {
    return LOST_OBJECTS_API_ENDPOINTS()[method];
};

export class LostObjectsService {
    static get_all = async (): Promise<ILostObject[]> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosJavaInstance.get<ILostObject[]>(endpoint).then(response => response.data);
    };
}