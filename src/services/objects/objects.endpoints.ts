export const OBJECTS_API_ENDPOINTS = (/*id: string = ""*/) => {
    const resourse = '/objects';
    return {
      GET_ALL: `${resourse}`,
      POST: `${resourse}`,
    };
  };

  export type TEndpointKeys = 'GET_ALL' | 'POST'