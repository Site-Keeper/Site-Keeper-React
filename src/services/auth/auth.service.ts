import { axiosNestInstance } from "../../axios.config";
import { ILoginReq, ILoginResp } from "../../models/services/auth.interfaces";
import { AUTH_API_ENDPOINTS, TEndpointKeys } from "./auth.endpoints";

const getEnpoint = (method: TEndpointKeys): string => {
    return AUTH_API_ENDPOINTS()[method];
};

export class AuthService {
    static login = async (
        req: ILoginReq,
    ): Promise<ILoginResp> => {
        const endpoint = getEnpoint("LOGIN");
        return await axiosNestInstance.post<ILoginResp>(endpoint, req).then(response => response.data);
    };
}