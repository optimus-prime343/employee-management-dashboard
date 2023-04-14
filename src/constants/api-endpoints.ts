export const API_ENDPOINTS = {
  baseUrl: '/api',
  employee: {
    base: '/employee',
    getEmployeeCount: '/employee/count',
  },
  team: {
    getTeamCount: '/team/count',
  },
} as const
