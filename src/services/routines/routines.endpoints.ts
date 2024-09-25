export const ROUTINES_API_ENDPOINTS = (id?: number) =>{
    const resourse = '/routine';

    return {
        GET_ALL: `${resourse}`,
        GET_BY_USER: `${resourse}/ByUsers/${id}`,
        GET_TODAY_ROUTINE: `${resourse}/today`,
        POST: `${resourse}`,
    }
}

export type TEndpointKeys = 'GET_ALL' | 'GET_BY_USER' | 'GET_TODAY_ROUTINE'| 'POST'
