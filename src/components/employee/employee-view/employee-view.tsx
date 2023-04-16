import { Box, Button, Pagination, Paper, Text, TextInput } from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { Employee } from '@prisma/client'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { EmployeeListTable } from '@/components/employee/employee-list-table'
import { QUERY_KEYS } from '@/constants/query-keys'
import { useDeleteEmployee, useEmployees } from '@/hooks/employee'
import { getEmployeeFullName } from '@/utils/employee'

import { EmployeeInfoDrawer } from '../employee-info-drawer'

export function EmployeeView() {
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >(undefined)
  const [search, setSearch] = useDebouncedState<string>('', 400)
  const [activePage, setActivePage] = useState<number>(1)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: paginatedEmployees, refetch: refetchEmployees } = useEmployees({
    search,
    page: activePage,
  })
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
              Promise.all([
                queryClient.invalidateQueries(
                  QUERY_KEYS.employee.getEmployeeCount
                ),
                refetchEmployees(),
              ]).catch(error => {
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
    [deleteEmployee, queryClient, refetchEmployees]
  )
  const handleEditEmployee = useCallback(
    (employee: Employee) =>
      void router.push({
        pathname: '/edit-employee',
        query: { id: employee.id },
      }),
    [router]
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
          <TextInput
            defaultValue={search}
            icon={<IconSearch />}
            onChange={event => setSearch(event.currentTarget.value)}
            placeholder='Search employee'
          />
          <Box sx={{ flex: 1 }} />
          <Button component={Link} href='/add-employee' leftIcon={<IconPlus />}>
            Add Employee
          </Button>
        </Box>
        <EmployeeListTable
          employees={paginatedEmployees?.data ?? []}
          onDeleteEmployee={openConfirmDeleteEmployeeModal}
          onEditEmployee={handleEditEmployee}
          onViewEmployee={setSelectedEmployee}
        />
        <Pagination
          mt='md'
          onChange={setActivePage}
          position='right'
          total={paginatedEmployees?.totalPages ?? 0}
          value={activePage}
        />
      </Paper>
    </>
  )
}
