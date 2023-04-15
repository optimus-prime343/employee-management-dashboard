/* eslint-disable react/destructuring-assignment */
import {
  Button,
  Checkbox,
  createStyles,
  Divider,
  FileButton,
  Flex,
  NumberInput,
  Paper,
  Select,
  SelectItem,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { Employee } from '@prisma/client'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'

import { useTeams } from '@/hooks/team'
import { EmployeeFormData, EmployeeSchema } from '@/schemas/employee'
import { formatDateInputDate, formatDateInputTime } from '@/utils/date-input'

interface AddEmployeeFormProps {
  mode: 'add'
  onAddEmployeeSubmit: (employeeFormData: FormData) => void
  isAddButtonLoading?: boolean
}

interface EditEmployeeFormProps {
  mode: 'edit'
  employee: Employee
  onEditEmployeeSubmit: (employeeFormData: FormData) => void
  isEditButtonLoading?: boolean
}

type EmployeeFormProps = AddEmployeeFormProps | EditEmployeeFormProps

const GAP = 64
export function EmployeeForm(props: EmployeeFormProps) {
  const [image, setImage] = useState<File | null>(null)

  const imageURL = useMemo<string | undefined>(
    () => (image !== null ? URL.createObjectURL(image) : undefined),
    [image]
  )
  const employee = props.mode === 'add' ? undefined : props.employee

  const { data: teams } = useTeams()
  const selectTeamData = useMemo<SelectItem[]>(
    () =>
      teams.map(team => ({
        label: team.name,
        value: team.id.toString(),
      })),
    [teams]
  )
  const form = useForm<EmployeeFormData>({
    validate: zodResolver(EmployeeSchema),
    initialValues: {
      firstName: employee?.firstName ?? '',
      middleName: employee?.middleName ?? '',
      lastName: employee?.lastName ?? '',
      dateOfBirth: formatDateInputDate(employee?.dateOfBirth) ?? '',
      gender: employee?.gender ?? '',
      address: employee?.address ?? '',
      phoneNumber: employee?.phoneNumber ?? '',
      email: employee?.email ?? '',
      workStartsAt: formatDateInputTime(employee?.workStartsAt) ?? '',
      workEndsAt: formatDateInputTime(employee?.workEndsAt) ?? '',
      position: employee?.position ?? '',
      isBillable: employee?.isBillable ?? true,
      billableHours: employee?.billableHours ?? 40,
      teamId: String(employee?.teamId) ?? '',
    },
  })
  const handleSubmit = useCallback(
    (data: EmployeeFormData) => {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, String(value))
      )
      if (image !== null) formData.append('profileImage', image)
      if (props.mode === 'add') props.onAddEmployeeSubmit(formData)
      if (props.mode === 'edit') props.onEditEmployeeSubmit(formData)
    },
    [image, props]
  )
  const { classes } = useStyles()
  return (
    <Paper p='md'>
      <Flex align='center' gap={GAP * 1.2}>
        <Image
          alt='Profile Image'
          className={classes.image}
          height={100}
          src={imageURL ?? employee?.profileImage ?? '/images/default_user.png'}
          width={100}
        />
        <Stack>
          <Title order={4}>Profile Image</Title>
          <FileButton accept='image/*' onChange={setImage}>
            {props_ => <Button {...props_}>Add or update image</Button>}
          </FileButton>
        </Stack>
      </Flex>
      <Divider my='lg' />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex align='baseline' gap={GAP}>
          <Title order={6}>Basic Information</Title>
          <SimpleGrid cols={3} sx={{ flex: 1 }}>
            <TextInput
              label='First Name'
              placeholder='Enter first name'
              withAsterisk
              {...form.getInputProps('firstName')}
            />
            <TextInput
              label='Middle Name'
              placeholder='Enter middle name'
              {...form.getInputProps('middleName')}
            />
            <TextInput
              label='Last Name'
              placeholder='Enter last name'
              withAsterisk
              {...form.getInputProps('lastName')}
            />
            <TextInput
              label='Date of Birth'
              placeholder='Enter date of birth'
              type='date'
              withAsterisk
              {...form.getInputProps('dateOfBirth')}
            />
            <Select
              data={['Male', 'Female', 'Other']}
              label='Gender'
              placeholder='Select a gender'
              withAsterisk
              {...form.getInputProps('gender')}
            />
            <TextInput
              label='Address'
              placeholder='Enter your address'
              withAsterisk
              {...form.getInputProps('address')}
            />
            <TextInput
              label='Phone number'
              placeholder='Enter your phone number'
              withAsterisk
              {...form.getInputProps('phoneNumber')}
            />
            <TextInput
              label='Email Address'
              placeholder='Enter your email address'
              type='email'
              withAsterisk
              {...form.getInputProps('email')}
            />
          </SimpleGrid>
        </Flex>
        <Divider my='lg' />
        <Flex align='baseline' gap={GAP}>
          <Title order={6}>Working Hours</Title>
          <SimpleGrid cols={3} sx={{ flex: 1 }}>
            <TextInput
              label='Starts At'
              type='time'
              withAsterisk
              {...form.getInputProps('workStartsAt')}
            />
            <TextInput
              label='Ends At'
              type='time'
              withAsterisk
              {...form.getInputProps('workEndsAt')}
            />
          </SimpleGrid>
        </Flex>
        <Divider my='lg' />
        <Flex align='baseline' gap={GAP}>
          <Title order={6}>Work</Title>
          <SimpleGrid cols={3} sx={{ flex: 1 }}>
            <TextInput
              label='Job Position'
              placeholder='Enter job position'
              withAsterisk
              {...form.getInputProps('position')}
            />
            <Select
              data={selectTeamData}
              label='Team'
              placeholder='Select a team'
              withAsterisk
              {...form.getInputProps('teamId')}
            />
          </SimpleGrid>
        </Flex>
        <Divider my='lg' />
        <Flex align='baseline' gap={GAP}>
          <Title order={6}>Billable Information</Title>
          <SimpleGrid>
            <Checkbox
              label='This user is billable'
              {...form.getInputProps('isBillable', { type: 'checkbox' })}
            />
            <NumberInput
              disabled={!form.values.isBillable}
              label='Billable hours'
              placeholder='Enter billable hours'
              {...form.getInputProps('billableHours')}
            />
          </SimpleGrid>
        </Flex>
        <Divider my='lg' />
        <Button
          loading={
            props.mode === 'edit'
              ? props.isEditButtonLoading
              : props.isAddButtonLoading
          }
          type='submit'
        >
          Save
        </Button>
      </form>
    </Paper>
  )
}
const useStyles = createStyles(() => ({
  image: {
    objectFit: 'cover',
    borderRadius: '50%',
  },
}))
