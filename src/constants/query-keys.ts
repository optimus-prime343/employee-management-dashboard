export const QUERY_KEYS = {
  employee: {
    getEmployeeCount: ['employeeCount'],
    getEmployees: ['employees'],
    getEmployeeDetail: (id: string) => ['employee', id],
  },
  team: {
    getTeamCount: ['teamCount'],
    getTeams: ['teams'],
    getTeamDetail: (id: string) => ['team', id],
    getTeamManHours: (memberIds: string[]) => ['teamManHours', ...memberIds],
  },
} as const
