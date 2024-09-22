export const AUTH_API_ENDPOINTS = () =>{
    const resourse = '/auth';

    return {
        LOGIN: `${resourse}/login`,
    }
}

export type TEndpointKeys = 'LOGIN' 
