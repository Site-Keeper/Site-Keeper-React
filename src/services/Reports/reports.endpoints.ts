export const REPORTS_API_ENDPOINTS = (/*id: string = ""*/) => {
    const resourse = '/reports';    
    return {
      GET_ALL: `${resourse}`,
      GET_SUMMARY: `${resourse}/summary`,
    };
  };

  export type TEndpointKeys = 'GET_ALL' | 'GET_SUMMARY'