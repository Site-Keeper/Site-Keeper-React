import { axiosJavaInstance} from "../../axios.config";
import { ISpace } from "../../models/interfaces";
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
}