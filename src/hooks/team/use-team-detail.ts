import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { TeamWithMembers } from '@/hooks/team/use-teams'
import { api } from '@/lib/api'
import { ApiResponseSuccess } from '@/types/api-response'

export const useTeamDetail = (id: string) =>
  useQuery<TeamWithMembers, Error>({
    queryKey: QUERY_KEYS.team.getTeamDetail(id),
    queryFn: async () => {
      try {
        const teamDetailResponse = await api.get<
          ApiResponseSuccess<TeamWithMembers>
        >(`/team/${id}`)
        return teamDetailResponse.data.data
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching team detail')
      }
    },
    enabled: !Number.isNaN(Number(id)),
  })
