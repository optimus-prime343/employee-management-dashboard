import { Box, Button, Paper, TextInput } from '@mantine/core'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import Link from 'next/link'

export function EmployeeView() {
  return (
    <Paper py='md'>
      <Box sx={{ display: 'flex' }}>
        <TextInput icon={<IconSearch />} placeholder='Search employee' />
        <Box sx={{ flex: 1 }} />
        <Button component={Link} href='/add-employee' leftIcon={<IconPlus />}>
          Add Employee
        </Button>
      </Box>
    </Paper>
  )
}
