import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { TeamFormData } from '@/schemas/team'
import { ApiResponseSuccess } from '@/types/api-response'

export const useAddTeam = () =>
  useMutation<string, Error, TeamFormData>({
    mutationFn: async teamFormData => {
      try {
        const addTeamResponse = await api.post<ApiResponseSuccess<string>>(
          '/team',
          teamFormData
        )
        return addTeamResponse.data.data
      } catch (error) {
        console.error(error)
        throw new Error('Error adding team')
      }
    },
  })
