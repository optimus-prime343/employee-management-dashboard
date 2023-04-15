/* eslint-disable react/destructuring-assignment */
import {
  Button,
  Divider,
  Flex,
  MultiSelect,
  Paper,
  PasswordInput,
  SimpleGrid,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useCallback, useMemo } from 'react'

import { useEmployees } from '@/hooks/employee'
import { TeamWithMembers } from '@/hooks/team'
import { TeamFormData, TeamSchema } from '@/schemas/team'
import { getEmployeeFullName } from '@/utils/employee'

import { TeamMemberSelectItem } from '../team-member-select-item'

export interface AddTeamFormProps {
  mode: 'add'
  onAddTeam: (teamFormData: TeamFormData) => void
  isAddButtonLoading?: boolean
}
export interface EditTeamFormProps {
  mode: 'edit'
  team: TeamWithMembers
  onEditTeam: (teamFormData: TeamFormData) => void
  isEditButtonLoading?: boolean
}
export type TeamFormProps = AddTeamFormProps | EditTeamFormProps

const GAP = 64
const MIN_INPUT_WIDTH = 350
const MIN_SELECT_MEMBERS_HEIGHT = 600

export function TeamForm(props: TeamFormProps) {
  const { data: employees } = useEmployees()
  const selectTeamMembersData = useMemo(
    () =>
      employees.map(employee => ({
        label: getEmployeeFullName(employee),
        value: employee.id.toString(),
        description: employee.position,
        image: employee.profileImage,
        // isAlreadyOnATeam: employee.teamId !== null,
        disabled: employee.teamId !== null,
      })),
    [employees]
  )
  const team = props.mode === 'edit' ? props.team : undefined
  const teamMembers =
    team !== undefined ? team.members.map(member => member.id.toString()) : []

  const form = useForm<TeamFormData>({
    validate: zodResolver(TeamSchema),
    initialValues: {
      name: team?.name ?? '',
      password: team?.password ?? '',
      members: teamMembers,
      totalManHours: team?.totalManHours ?? 0,
    },
  })

  const handleFormSubmit = useCallback(
    (teamFormData: TeamFormData) => {
      if (props.mode === 'add') props.onAddTeam(teamFormData)
      if (props.mode === 'edit') props.onEditTeam(teamFormData)
    },
    [props]
  )

  return (
    <Paper p='md'>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Flex align='baseline' gap={GAP}>
          <Title order={6}>Basic Information</Title>
          <SimpleGrid cols={2}>
            <TextInput
              label='Team Name'
              miw={MIN_INPUT_WIDTH}
              placeholder='Enter team name'
              withAsterisk
              {...form.getInputProps('name')}
            />
            <PasswordInput
              label='Team Password'
              miw={MIN_INPUT_WIDTH}
              placeholder='Enter team password'
              withAsterisk
              {...form.getInputProps('password')}
            />
          </SimpleGrid>
        </Flex>
        <Divider my='lg' />
        <Flex align='baseline' gap={GAP}>
          <Title order={6}>Team Members</Title>
          <SimpleGrid cols={1}>
            <MultiSelect
              data={selectTeamMembersData}
              itemComponent={TeamMemberSelectItem}
              label='Team Members'
              maxDropdownHeight={MIN_SELECT_MEMBERS_HEIGHT}
              miw={MIN_INPUT_WIDTH}
              placeholder='Select team members'
              withAsterisk
              {...form.getInputProps('members')}
            />
            <TextInput
              disabled
              label='Billable Hours'
              placeholder='Enter billable hours'
            />
          </SimpleGrid>
        </Flex>
        <Divider my='lg' />
        <Button
          loading={
            props.mode === 'add'
              ? props.isAddButtonLoading
              : props.isEditButtonLoading
          }
          type='submit'
        >
          Save
        </Button>
      </form>
    </Paper>
  )
}
