import { axiosJavaInstance, axiosJavaInstanceImage } from "../../axios.config";

import { ICreateLostObjectReq, IGetLostObjectSummaryResp, IUpdateLostObject } from "../../models/services/lost-object.interfaces";

import { ILostObject } from "../../models/interfaces/lost-object.interface";

import { LOST_OBJECTS_API_ENDPOINTS, TEndpointKeys } from "./lost-objects.endpoints";

const getEnpoint = (method: TEndpointKeys, id?:string): string => {
    return LOST_OBJECTS_API_ENDPOINTS(id)[method];
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

    static create = async (req: ICreateLostObjectReq): Promise<ILostObject> => {
        const endpoint = getEnpoint("CREATE");
        return await axiosJavaInstanceImage.post<ILostObject>(endpoint,req).then(response => response.data);
    };

    static update = async(req: IUpdateLostObject, id: string): Promise<ILostObject> => {
        const endpoint = getEnpoint('PUT', id)
        return await axiosJavaInstanceImage.put<ILostObject>(endpoint, req).then(response => response.data)
    }

    static delete = async (req: {id: string})=> {
        const endpoint = getEnpoint("DELETE", req.id);
        return await axiosJavaInstanceImage.delete<ILostObject>(endpoint).then(response => response.data);
    };
}