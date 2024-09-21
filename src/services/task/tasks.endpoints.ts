export const TASKS_API_ENDPOINTS = (id: number | undefined) => {
    const resourse = '/tasks';
    return {
      GET_BY_ROUTINES: `${resourse}/ByRoutine/${id}`,
    };
  };

  export type TEndpointKeys = 'GET_BY_ROUTINES'