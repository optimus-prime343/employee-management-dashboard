import {
  Badge,
  Box,
  Button,
  createStyles,
  Divider,
  Drawer,
  DrawerProps,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { Employee } from '@prisma/client'
import { IconPencil } from '@tabler/icons-react'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'

import { getEmployeeFullName } from '@/utils/employee'

export interface EmployeeInfoDrawerProps extends DrawerProps {
  employee: Employee
}
export function EmployeeInfoDrawer({
  employee,
  ...rest
}: EmployeeInfoDrawerProps) {
  const billableStatus = useMemo(
    () =>
      employee.isBillable ? 'Employee is billable' : 'Employee is not billable',
    [employee.isBillable]
  )
  const { classes } = useStyles()
  return (
    <Drawer {...rest}>
      <Image
        alt={`${getEmployeeFullName(employee)} profile image`}
        className={classes.image}
        height={140}
        src={employee.profileImage ?? '/images/default_user.png'}
        width={140}
      />
      <Stack mt='sm' spacing={0}>
        <Title order={4}>{getEmployeeFullName(employee)}</Title>
        <Text>{employee.email}</Text>
      </Stack>
      <Badge mt='sm'>Employee</Badge>
      <Divider my='md' />
      <SimpleGrid cols={2}>
        <EmployeeInfo label='Designation' value={employee.position} />
        <EmployeeInfo label='Contact' value={employee.phoneNumber} />
        <EmployeeInfo label='Address' value={employee.address} />
      </SimpleGrid>
      <Divider my='md' />
      <SimpleGrid cols={2}>
        <EmployeeInfo
          label='Start Date'
          value={dayjs(employee.workStartsAt).format('L')}
        />
        <EmployeeInfo label='Role' value={employee.position} />
        <EmployeeInfo label='Billable status' value={billableStatus} />
        <EmployeeInfo
          label='Billable Hours'
          value={`${employee.billableHours} Hours/Week`}
        />
      </SimpleGrid>
      <Divider my='md' />
      <Button
        component={Link}
        fullWidth
        href={{
          pathname: '/edit-employee',
          query: { id: employee.id },
        }}
        leftIcon={<IconPencil />}
      >
        Edit Profile
      </Button>
    </Drawer>
  )
}
function EmployeeInfo({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Text>{label}</Text>
      <Text mt={2}>{value}</Text>
    </Box>
  )
}
const useStyles = createStyles(() => ({
  image: {
    borderRadius: '50%',
    objectFit: 'cover',
  },
}))
