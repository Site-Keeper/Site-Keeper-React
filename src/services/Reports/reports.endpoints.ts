export const REPORTS_API_ENDPOINTS = (id: number = 0) => {
    const resourse = '/reports';    
    return {
      GET_ALL: `${resourse}`,
      GET_SUMMARY: `${resourse}/summary`,
      POST: `${resourse}`,
      UPDATE_STATUS: `${resourse}/${id}/status`,
      GET_BY_TOPIC: `${resourse}/topic/${id}`,
    };
  };

  export type TEndpointKeys = 'GET_ALL' | 'GET_SUMMARY' | 'POST' | 'UPDATE_STATUS' | 'GET_BY_TOPIC';