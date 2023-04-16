import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { ApiResponseSuccess } from '@/types/api-response'

export const useDeleteEmployee = () =>
  useMutation<string, Error, number>({
    mutationFn: async id => {
      try {
        const deleteEmployeeResponse = await api.delete<
          ApiResponseSuccess<string>
        >('/employee', {
          params: { id },
        })
        return deleteEmployeeResponse.data.data
      } catch (error) {
        console.error(error)
        throw new Error("Couldn't delete employee")
      }
    },
  })
