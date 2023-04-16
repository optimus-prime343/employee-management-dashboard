import { Employee, Team } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { QUERY_KEYS } from '@/constants/query-keys'
import { api } from '@/lib/api'
import { PaginatedResponse } from '@/types/api-response'

export type EmployeeWithTeam = Employee & { team: Team }
export interface GetEmployeesRequestParams {
  search?: string
  page?: number
}
export const useEmployees = (params?: GetEmployeesRequestParams) =>
  useQuery<PaginatedResponse<EmployeeWithTeam[]>, Error>({
    queryKey: [...QUERY_KEYS.employee.getEmployees, params],
    queryFn: async () => {
      try {
        const employeesResponse = await api.get<
          PaginatedResponse<EmployeeWithTeam[]>
        >(API_ENDPOINTS.employee.base, {
          params,
        })
        return employeesResponse.data
      } catch (error) {
        console.error(error)
        throw new Error("Couldn't get employees")
      }
    },
  })
