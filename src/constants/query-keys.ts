export const QUERY_KEYS = {
  employee: {
    getEmployeeCount: ['employeeCount'],
    getEmployees: ['employees'],
    getEmployeeDetail: (id: string) => ['employee', id],
  },
  team: {
    getTeamCount: ['teamCount'],
    getTeams: ['teams'],
  },
} as const
