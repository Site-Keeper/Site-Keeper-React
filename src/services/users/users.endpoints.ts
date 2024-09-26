export const USERS_API_ENDPOINTS = (id: number | undefined) =>{
    const resourse = '/users';

    return {
        GET_ALL: `${resourse}`,
        GET_STATS: `${resourse}/statistics`,
        POST: `${resourse}`,
        UPDATE: `${resourse}/${id}`,
        DELETE: `${resourse}/${id}`,
    }
}

export type TEndpointKeys = 'GET_ALL' | 'GET_STATS' | 'POST' | 'UPDATE' | 'DELETE'; 
