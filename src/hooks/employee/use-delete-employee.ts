import { useMutation } from '@tanstack/react-query'

import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { api } from '@/lib/api'
import { ApiResponseSuccess } from '@/types/api-response'

export const useDeleteEmployee = () =>
  useMutation<string, Error, number>({
    mutationFn: async id => {
      try {
        const deleteEmployeeResponse = await api.delete<
          ApiResponseSuccess<string>
        >(API_ENDPOINTS.employee.base, {
          params: { id },
        })
        return deleteEmployeeResponse.data.data
      } catch (error) {
        console.error(error)
        throw new Error("Couldn't delete employee")
      }
    },
  })
