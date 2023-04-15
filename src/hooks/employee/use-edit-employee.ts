import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { ApiResponseSuccess } from '@/types/api-response'

export interface EditEmployeeParams {
  id: string
  editEmployeeFormData: FormData
}
export const useEditEmployee = () =>
  useMutation<string, Error, EditEmployeeParams>({
    mutationFn: async ({ id, editEmployeeFormData }) => {
      try {
        const editEmployeeResponse = await api.patch<
          ApiResponseSuccess<string>
        >(`/employee/${id}`, editEmployeeFormData)
        return editEmployeeResponse.data.data
      } catch (error) {
        console.error(error)
        throw new Error("Couldn't edit employee")
      }
    },
  })
