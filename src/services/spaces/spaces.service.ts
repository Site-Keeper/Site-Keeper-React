import { axiosJavaInstance} from "../../axios.config";
import { IGetAllSpacesResp } from "../../models/services/spaces.interfaces";
import { SPACES_API_ENDPOINTS, TEndpointKeys } from "./spaces.endpoints";

const getEnpoint = (method: TEndpointKeys): string => {
    return SPACES_API_ENDPOINTS()[method];
};

export class SpacesService {
    static getAll = async (): Promise<IGetAllSpacesResp> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosJavaInstance.get<IGetAllSpacesResp>(endpoint).then(response => response.data);
    };
}