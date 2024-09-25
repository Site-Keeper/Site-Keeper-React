export const ROUTINES_API_ENDPOINTS = () =>{
    const resourse = '/routine';

    return {
        GET_ALL: `${resourse}`,
        POST: `${resourse}`,
    }
}

export type TEndpointKeys = 'GET_ALL' | 'POST'
