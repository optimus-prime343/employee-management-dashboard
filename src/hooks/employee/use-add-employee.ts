import { useMutation } from '@tanstack/react-query'

import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { api } from '@/lib/api'
import { ApiResponseSuccess } from '@/types/api-response'

export const useAddEmployee = () =>
  useMutation<string, Error, FormData>({
    mutationFn: async employeeFormData => {
      try {
        const createEmployeeResponse = await api.post<
          ApiResponseSuccess<string>
        >(API_ENDPOINTS.employee.base, employeeFormData)
        return createEmployeeResponse.data.data
      } catch (error) {
        console.error(error)
        throw new Error('Error creating employee')
      }
    },
  })
