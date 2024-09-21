import { axiosJavaInstance } from "../../axios.config";
import { IGetAllLostObjectsRes } from "../../models/services/lost-object.interfaces";
import { LOST_OBJECTS_API_ENDPOINTS, TEndpointKeys } from "./lost-objects.endpoints";

const getEnpoint = (method: TEndpointKeys): string => {
    return LOST_OBJECTS_API_ENDPOINTS()[method];
};

export class LostObjectsService {
    static get_all = async (): Promise<IGetAllLostObjectsRes> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosJavaInstance.get<IGetAllLostObjectsRes>(endpoint).then(response => response.data);
    };
}