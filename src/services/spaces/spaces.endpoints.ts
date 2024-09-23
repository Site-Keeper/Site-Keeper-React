export const SPACES_API_ENDPOINTS = (id: string = "") => {
    const resourse = '/spaces';
    return {
      GET_ALL: `${resourse}`,
      GET_BY_ID: `${resourse}/${id}`,
    };
  };

  export type TEndpointKeys = 'GET_ALL' | 'GET_BY_ID'