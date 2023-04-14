import { Employee } from '@prisma/client'

export const getEmployeeFullName = (employee: Employee): string => {
  return employee.middleName !== null
    ? `${employee.firstName} ${employee.middleName} ${employee.lastName}`
    : `${employee.firstName} ${employee.lastName}`
}
