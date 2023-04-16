import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { EmployeeWithTeam } from '@/hooks/employee/use-employees'
import { api } from '@/lib/api'
import { ApiResponseSuccess } from '@/types/api-response'

export const useEmployeeDetail = (id: string) =>
  useQuery<EmployeeWithTeam, Error>({
    queryKey: QUERY_KEYS.employee.getEmployeeDetail(id),
    queryFn: async () => {
      try {
        const employeeDetailResponse = await api.get<
          ApiResponseSuccess<EmployeeWithTeam>
        >(`/employee/${id}`)
        return employeeDetailResponse.data.data
      } catch (error) {
        console.error(error)
        throw new Error('Failed to fetch employee detail')
      }
    },
    enabled: !Number.isNaN(Number(id)),
  })
