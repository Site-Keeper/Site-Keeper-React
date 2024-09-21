export const SPACES_API_ENDPOINTS = (/*id: string = ""*/) => {
    const resourse = '/spaces';
    return {
      GET_ALL: `${resourse}`,
    };
  };

  export type TEndpointKeys = 'GET_ALL'