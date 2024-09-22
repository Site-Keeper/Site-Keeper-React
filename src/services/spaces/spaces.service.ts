import { axiosJavaInstance} from "../../axios.config";
import { ISpace } from "../../models/interfaces";
import { SPACES_API_ENDPOINTS, TEndpointKeys } from "./spaces.endpoints";

const getEnpoint = (method: TEndpointKeys): string => {
    return SPACES_API_ENDPOINTS()[method];
};

export class SpacesService {
    static getAll = async (): Promise<ISpace[]> => {
        const endpoint = getEnpoint("GET_ALL");
        return await axiosJavaInstance.get<ISpace[]>(endpoint).then(response => response.data);
    };
}