import { ActionIcon, Group, Table, Text } from '@mantine/core'
import { Employee } from '@prisma/client'
import { IconEye, IconPencil, IconTrash } from '@tabler/icons-react'
import { ReactNode, useCallback, useMemo } from 'react'

import { TeamQRCode } from '@/components/team/team-qr-code'
import { TeamWithMembers } from '@/hooks/team'
import { getEmployeeFullName } from '@/utils/employee'

export interface TeamListTableProps {
  teams: TeamWithMembers[]
  onEditTeam?: (team: TeamWithMembers) => void
  onDeleteTeam?: (team: TeamWithMembers) => void
  onViewTeam?: (team: TeamWithMembers) => void
}
export function TeamListTable({
  teams,
  onEditTeam,
  onDeleteTeam,
  onViewTeam,
}: TeamListTableProps) {
  const formatTeamMembers = useCallback((members: Employee[]): ReactNode => {
    if (members.length === 0) return 'No members assigned'
    if (members.length === 1) return getEmployeeFullName(members[0])
    if (members.length === 2)
      return `${getEmployeeFullName(members[0])} and ${getEmployeeFullName(
        members[1]
      )}`
    const [firstMember, secondMember, ...remainingMembers] = members
    return (
      <Text>
        {getEmployeeFullName(firstMember)}, {getEmployeeFullName(secondMember)}
        <Text component='span' fw='bold'>
          {' '}
          & {remainingMembers.length} more
        </Text>
      </Text>
    )
  }, [])
  const rows = useMemo<JSX.Element[]>(
    () =>
      teams.map(team => (
        <tr key={team.id}>
          <td>{team.name}</td>
          <td>{formatTeamMembers(team.members)}</td>
          <td>
            <TeamQRCode
              style={{ width: 40, height: 40 }}
              teamId={team.id.toString()}
            />
          </td>
          <td>{team.totalManHours}</td>
          <td>
            <Group>
              <ActionIcon color='green' onClick={() => onViewTeam?.(team)}>
                <IconEye />
              </ActionIcon>
              <ActionIcon color='blue' onClick={() => onEditTeam?.(team)}>
                <IconPencil />
              </ActionIcon>
              <ActionIcon color='red' onClick={() => onDeleteTeam?.(team)}>
                <IconTrash />
              </ActionIcon>
            </Group>
          </td>
        </tr>
      )),
    [formatTeamMembers, onDeleteTeam, onEditTeam, onViewTeam, teams]
  )
  return (
    <Table>
      <thead>
        <tr>
          <th>Team Name</th>
          <th>Members</th>
          <th>QR Details</th>
          <th>Total Man Hours</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}
