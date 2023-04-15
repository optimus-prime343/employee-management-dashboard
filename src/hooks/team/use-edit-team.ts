import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { TeamFormData } from '@/schemas/team'
import { ApiResponseSuccess } from '@/types/api-response'

export interface EditTeamParams {
  id: string
  editTeamFormData: TeamFormData
}
export const useEditTeam = () =>
  useMutation<string, Error, EditTeamParams>({
    mutationFn: async ({ id, editTeamFormData }) => {
      try {
        const editTeamResponse = await api.patch<ApiResponseSuccess<string>>(
          `/team/${id}`,
          editTeamFormData
        )
        return editTeamResponse.data.data
      } catch (error) {
        console.error(error)
        throw new Error('Error editing team')
      }
    },
  })
