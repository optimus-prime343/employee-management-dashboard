export const API_ENDPOINTS = {
  baseUrl: '/api',
  employee: {
    base: '/employee',
    getEmployeeCount: '/employee/count',
    getEmployeeDetail: (id: string) => `/employee/${id}`,
  },
  team: {
    getTeamCount: '/team/count',
  },
} as const
