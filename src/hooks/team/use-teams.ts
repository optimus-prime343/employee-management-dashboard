import { Team } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { api } from '@/lib/api'
import { ApiResponseSuccess } from '@/types/api-response'

export const useTeams = () =>
  useQuery<Team[], Error>({
    queryKey: QUERY_KEYS.team.getTeams,
    queryFn: async () => {
      try {
        const teamsResponse = await api.get<ApiResponseSuccess<Team[]>>('/team')
        return teamsResponse.data.data
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching teams')
      }
    },
    initialData: [],
  })
