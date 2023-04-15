import { Employee, Team } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { api } from '@/lib/api'
import { ApiResponseSuccess } from '@/types/api-response'

export type TeamWithMembers = Team & {
  members: Employee[]
}
export const useTeams = () =>
  useQuery<TeamWithMembers[], Error>({
    queryKey: QUERY_KEYS.team.getTeams,
    queryFn: async () => {
      try {
        const teamsResponse = await api.get<
          ApiResponseSuccess<TeamWithMembers[]>
        >('/team')
        return teamsResponse.data.data
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching teams')
      }
    },
    initialData: [],
  })
