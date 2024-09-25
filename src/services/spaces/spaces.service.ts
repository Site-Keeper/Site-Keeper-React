import { axiosJavaInstance, axiosJavaInstanceImage} from "../../axios.config";
import { ISpace } from "../../models/interfaces";
import { ICreateSpace } from "../../models/services/spaces.interfaces";
import { SPACES_API_ENDPOINTS, TEndpointKeys } from "./spaces.endpoints";

const getEnpoint = (method: TEndpointKeys, id?: string): string => {
    return SPACES_API_ENDPOINTS(id)[method];
};

export class SpacesService {
    static getAll = async (): Promise<ISpace[]> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosJavaInstance.get<ISpace[]>(endpoint).then(response => response.data);
    };

    static getOne = async (id: string | undefined): Promise<ISpace> => {
        const endpoint = getEnpoint("GET_BY_ID", id);
        return await axiosJavaInstance.get<ISpace>(endpoint, { params: { id } }).then(response => response.data);
    };

    static create = async (req : ICreateSpace): Promise<ISpace> => {
        const endpoint = getEnpoint('POST')
        return await axiosJavaInstanceImage.post<ISpace>(endpoint, req).then(response => response.data)
    }

    static update = async(req: ICreateSpace): Promise<ISpace> => {
        const endpoint = getEnpoint('PUT')
        return await axiosJavaInstanceImage.put<ISpace>(endpoint, req).then(response => response.data)
    }

}