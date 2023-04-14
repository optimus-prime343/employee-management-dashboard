export const API_ENDPOINTS = {
  baseUrl: '/api',
  employee: {
    getEmployeeCount: '/employee/count',
    getEmployees: '/employee',
  },
  team: {
    getTeamCount: '/team/count',
  },
} as const
