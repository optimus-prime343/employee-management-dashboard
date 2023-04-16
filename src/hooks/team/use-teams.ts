import { Employee, Team } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { api } from '@/lib/api'
import { PaginatedResponse } from '@/types/api-response'

export type TeamWithMembers = Team & {
  members: Employee[]
}
export type GetTeamsRequestParams = {
  search?: string
  page?: number
}
export const useTeams = (getTeamsRequestParams?: GetTeamsRequestParams) =>
  useQuery<PaginatedResponse<TeamWithMembers[]>, Error>({
    queryKey: [...QUERY_KEYS.team.getTeams, getTeamsRequestParams],
    queryFn: async () => {
      try {
        const teamsResponse = await api.get<
          PaginatedResponse<TeamWithMembers[]>
        >('/team', {
          params: getTeamsRequestParams,
        })
        return teamsResponse.data
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching teams')
      }
    },
  })
