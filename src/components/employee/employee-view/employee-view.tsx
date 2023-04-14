import { Box, Button, Paper, TextInput } from '@mantine/core'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import Link from 'next/link'

import { EmployeeListTable } from '@/components/employee/employee-list-table'
import { useEmployees } from '@/hooks/employee'

export function EmployeeView() {
  const { data: employees } = useEmployees()
  return (
    <Paper py='md'>
      <Box mb='md' sx={{ display: 'flex' }}>
        <TextInput icon={<IconSearch />} placeholder='Search employee' />
        <Box sx={{ flex: 1 }} />
        <Button component={Link} href='/add-employee' leftIcon={<IconPlus />}>
          Add Employee
        </Button>
      </Box>
      <EmployeeListTable employees={employees} />
    </Paper>
  )
}
