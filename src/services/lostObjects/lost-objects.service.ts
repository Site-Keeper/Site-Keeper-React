import { axiosJavaInstance } from "../../axios.config";
import { IGetAllLostObjectsRes, IGetLostObjectSummaryResp } from "../../models/services/lost-object.interfaces";
import { LOST_OBJECTS_API_ENDPOINTS, TEndpointKeys } from "./lost-objects.endpoints";

const getEnpoint = (method: TEndpointKeys): string => {
    return LOST_OBJECTS_API_ENDPOINTS()[method];
};

export class LostObjectsService {
    static get_all = async (): Promise<IGetAllLostObjectsRes> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosJavaInstance.get<IGetAllLostObjectsRes>(endpoint).then(response => response.data);
    };

    static get_summary = async (): Promise<IGetLostObjectSummaryResp> => {
        const endpoint = getEnpoint("GET_SUMMARY");
        return await axiosJavaInstance.get<IGetLostObjectSummaryResp>(endpoint).then(response => response.data);
    };
}