import { Box, Button, Paper, Text, TextInput } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { Employee } from '@prisma/client'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import { EmployeeListTable } from '@/components/employee/employee-list-table'
import { useDeleteEmployee, useEmployees } from '@/hooks/employee'
import { getEmployeeFullName } from '@/utils/employee'

import { EmployeeInfoDrawer } from '../employee-info-drawer'

export function EmployeeView() {
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >(undefined)

  const { data: employees, refetch: refetchEmployees } = useEmployees()
  const deleteEmployee = useDeleteEmployee()

  const openConfirmDeleteEmployeeModal = useCallback(
    (employee: Employee) => {
      openConfirmModal({
        title: 'Delete Employee',
        children: (
          <Text>
            Are you sure you want to delete{' '}
            <Text component='span' fw='bold'>
              {getEmployeeFullName(employee)}
            </Text>{' '}
            ?
          </Text>
        ),
        onConfirm: () => {
          deleteEmployee.mutate(employee.id, {
            onSuccess: message => {
              showNotification({
                title: 'Success',
                message,
                color: 'green',
              })
              refetchEmployees().catch(error => {
                console.error(error)
              })
            },
            onError: error => {
              showNotification({
                title: 'Error',
                message: error.message,
                color: 'red',
              })
            },
          })
        },
      })
    },
    [deleteEmployee, refetchEmployees]
  )
  return (
    <>
      {selectedEmployee !== undefined ? (
        <EmployeeInfoDrawer
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(undefined)}
          opened={selectedEmployee !== undefined}
          overlayProps={{ opacity: 0.5, blur: 4 }}
          position='right'
          title='Employee Information'
        />
      ) : null}
      <Paper py='md'>
        <Box mb='md' sx={{ display: 'flex' }}>
          <TextInput icon={<IconSearch />} placeholder='Search employee' />
          <Box sx={{ flex: 1 }} />
          <Button component={Link} href='/add-employee' leftIcon={<IconPlus />}>
            Add Employee
          </Button>
        </Box>
        <EmployeeListTable
          employees={employees}
          onDeleteEmployee={openConfirmDeleteEmployeeModal}
          onViewEmployee={setSelectedEmployee}
        />
      </Paper>
    </>
  )
}
