import { useQuery } from '@tanstack/react-query'

import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { QUERY_KEYS } from '@/constants/query-keys'
import { api } from '@/lib/api'
import { ApiResponseSuccess } from '@/types/api-response'

export const useEmployeeCount = () =>
  useQuery<number, Error>({
    queryKey: QUERY_KEYS.employee.getEmployeeCount,
    queryFn: async () => {
      try {
        const employeeCountResponse = await api.get<ApiResponseSuccess<number>>(
          API_ENDPOINTS.employee.getEmployeeCount
        )
        return employeeCountResponse.data.data
      } catch (error) {
        console.error(error)
        throw new Error("Couldn't get employee count")
      }
    },
    initialData: 0,
  })
