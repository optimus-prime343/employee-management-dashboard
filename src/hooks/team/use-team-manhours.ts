import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { api } from '@/lib/api'
import { ApiResponseSuccess } from '@/types/api-response'

export const useTeamManHours = (memberIds: string[]) =>
  useQuery({
    queryKey: QUERY_KEYS.team.getTeamManHours(memberIds),
    queryFn: async () => {
      try {
        const teamManHoursResponse = await api.get<ApiResponseSuccess<number>>(
          '/team/total-man-hours',
          {
            params: {
              members: memberIds.join(','),
            },
          }
        )
        return teamManHoursResponse.data.data
      } catch (error) {
        console.error(error)
        throw new Error('Failed to get team man hours')
      }
    },
    enabled: !!memberIds.length,
    initialData: 0,
  })
