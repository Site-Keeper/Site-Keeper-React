export const ROUTINES_API_ENDPOINTS = (id?: number) =>{
    const resourse = '/routine';

    return {
        GET_ALL: `${resourse}`,
        GET_BY_USER: `${resourse}/${id}`,
        GET_TODAY_ROUTINE: `${resourse}/today`,
    }
}

export type TEndpointKeys = 'GET_ALL' | 'GET_BY_USER' | 'GET_TODAY_ROUTINE'
