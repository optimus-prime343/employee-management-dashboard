import { useQuery } from '@tanstack/react-query'

import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { QUERY_KEYS } from '@/constants/query-keys'
import { api } from '@/lib/api'
import { ApiResponseSuccess } from '@/types/api-response'

export const useTeamCount = () =>
  useQuery<number, Error>({
    queryKey: QUERY_KEYS.team.getTeamCount,
    queryFn: async () => {
      try {
        const teamCountResponse = await api.get<ApiResponseSuccess<number>>(
          API_ENDPOINTS.team.getTeamCount
        )
        return teamCountResponse.data.data
      } catch (error) {
        console.error(error)
        throw new Error("Couldn't get team count")
      }
    },
    initialData: 0,
  })
