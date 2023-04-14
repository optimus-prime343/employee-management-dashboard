import { Box, Button, Paper, TextInput } from '@mantine/core'
import { Employee } from '@prisma/client'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'

import { EmployeeListTable } from '@/components/employee/employee-list-table'
import { useEmployees } from '@/hooks/employee'

import { EmployeeInfoDrawer } from '../employee-info-drawer'

export function EmployeeView() {
  const { data: employees } = useEmployees()
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >(undefined)
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
          onViewEmployee={setSelectedEmployee}
        />
      </Paper>
    </>
  )
}
