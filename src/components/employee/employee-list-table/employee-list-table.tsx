import { ActionIcon, Group, Table } from '@mantine/core'
import { Employee } from '@prisma/client'
import { IconEye, IconPencil, IconTrash } from '@tabler/icons-react'
import { useMemo } from 'react'

import { TableSkeleton } from '@/components/misc/table-skeleton'
import { EmployeeWithTeam } from '@/hooks/employee'
import { getEmployeeFullName } from '@/utils/employee'

export interface EmployeeListTableProps {
  employees: EmployeeWithTeam[]
  isEmployeesLoading?: boolean
  onViewEmployee?: (employee: Employee) => void
  onEditEmployee?: (employee: Employee) => void
  onDeleteEmployee?: (employee: Employee) => void
}
export function EmployeeListTable({
  employees,
  isEmployeesLoading,
  onViewEmployee,
  onEditEmployee,
  onDeleteEmployee,
}: EmployeeListTableProps) {
  const rows = useMemo(() => {
    return employees.map(employee => (
      <tr key={employee.id}>
        <td>{employee.id}</td>
        <td>{getEmployeeFullName(employee)}</td>
        <td>{employee.team ? employee.team.name : 'No team'}</td>
        <td>{employee.phoneNumber}</td>
        <td>{employee.email}</td>
        <td>{employee.position}</td>
        <td>{employee.billableHours}</td>
        <td>
          <Group>
            <ActionIcon
              color='green'
              onClick={() => onViewEmployee?.(employee)}
            >
              <IconEye />
            </ActionIcon>
            <ActionIcon color='blue' onClick={() => onEditEmployee?.(employee)}>
              <IconPencil />
            </ActionIcon>
            <ActionIcon
              color='red'
              onClick={() => onDeleteEmployee?.(employee)}
            >
              <IconTrash />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    ))
  }, [employees, onDeleteEmployee, onEditEmployee, onViewEmployee])

  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Full Name</th>
          <th>Current Team</th>
          <th>Mobile Number</th>
          <th>Email Address</th>
          <th>Designation</th>
          <th>Billable Hours</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{isEmployeesLoading ? <TableSkeleton /> : rows}</tbody>
    </Table>
  )
}
