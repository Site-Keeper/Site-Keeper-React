export const REPORTS_API_ENDPOINTS = (/*id: string = ""*/) => {
    const resourse = '/reports';    
    return {
      GET_ALL: `${resourse}`,
    };
  };

  export type TEndpointKeys = 'GET_ALL'