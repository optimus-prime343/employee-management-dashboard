import { Employee, Team } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { QUERY_KEYS } from '@/constants/query-keys'
import { api } from '@/lib/api'
import { ApiResponseSuccess } from '@/types/api-response'

export type EmployeeWithTeam = Employee & { team: Team }
export const useEmployees = () =>
  useQuery<EmployeeWithTeam[], Error>({
    queryKey: QUERY_KEYS.employee.getEmployees,
    queryFn: async () => {
      try {
        const employeesResponse = await api.get<
          ApiResponseSuccess<EmployeeWithTeam[]>
        >(API_ENDPOINTS.employee.base)
        return employeesResponse.data.data
      } catch (error) {
        console.error(error)
        throw new Error("Couldn't get employees")
      }
    },
    initialData: [],
  })
