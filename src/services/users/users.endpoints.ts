export const USERS_API_ENDPOINTS = () =>{
    const resourse = '/users';

    return {
        GET_ALL: `${resourse}`,
        GET_STATS: `${resourse}/statistics`,
    }
}

export type TEndpointKeys = 'GET_ALL' | 'GET_STATS'
