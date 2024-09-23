import { axiosJavaInstance } from "../../axios.config";

import { IGetLostObjectSummaryResp } from "../../models/services/lost-object.interfaces";

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

    static get_summary = async (): Promise<IGetLostObjectSummaryResp> => {
        const endpoint = getEnpoint("GET_SUMMARY");
        return await axiosJavaInstance.get<IGetLostObjectSummaryResp>(endpoint).then(response => response.data);
    };
}