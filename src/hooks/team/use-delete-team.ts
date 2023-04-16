import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { ApiResponseSuccess } from '@/types/api-response'

export const useDeleteTeam = () =>
  useMutation<string, Error, string>({
    mutationFn: async id => {
      try {
        const deleteTeamResponse = await api.delete<ApiResponseSuccess<string>>(
          `/team/${id}`
        )
        return deleteTeamResponse.data.data
      } catch (error) {
        console.error(error)
        throw new Error('Error deleting team')
      }
    },
  })
