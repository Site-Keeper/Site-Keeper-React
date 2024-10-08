export const LOST_OBJECTS_API_ENDPOINTS = (id: string = "") =>{
    const resourse = '/lost_objects';

    return {
        GET_ALL: `${resourse}`,
        GET_BY_ID: `${resourse}/${id}`,
        DELETE: `${resourse}/${id}`,
        CREATE: `${resourse}`,
        UPDATE: `${resourse}//${id}`,
        GET_SUMMARY: `${resourse}/summary`,
        POST : `${resourse}`
    }
}

export type TEndpointKeys = 'GET_ALL' | 'GET_BY_ID' | 'DELETE' | 'CREATE' | 'UPDATE' | 'GET_SUMMARY' | 'POST';
