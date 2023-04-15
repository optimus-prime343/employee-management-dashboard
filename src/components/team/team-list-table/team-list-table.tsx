import { ActionIcon, Group, Table, Text } from '@mantine/core'
import { Employee } from '@prisma/client'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { ReactNode, useCallback, useMemo } from 'react'
import QRCode from 'react-qr-code'

import { TeamWithMembers } from '@/hooks/team'
import { getEmployeeFullName } from '@/utils/employee'

export interface TeamListTableProps {
  teams: TeamWithMembers[]
  onEditTeam?: (team: TeamWithMembers) => void
  onDeleteTeam?: (team: TeamWithMembers) => void
}
export function TeamListTable({
  teams,
  onEditTeam,
  onDeleteTeam,
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

  const generateQRCodeValue = useCallback((team: TeamWithMembers): string => {
    const vercelURL = process.env.VERCEL_URL
    const localURL = 'http://localhost:3000'
    const qrScanRedirectURL = vercelURL ? `https://${vercelURL}` : localURL
    const url = new URL('/', qrScanRedirectURL)
    url.searchParams.append('name', team.name)
    url.searchParams.append('password', team.password)
    return url.toString()
  }, [])

  const rows = useMemo<JSX.Element[]>(
    () =>
      teams.map(team => (
        <tr key={team.id}>
          <td>{team.name}</td>
          <td>{formatTeamMembers(team.members)}</td>
          <td>
            <QRCode
              style={{ width: 40, height: 40 }}
              value={generateQRCodeValue(team)}
            />
          </td>
          <td>{team.totalManHours}</td>
          <td>
            <Group>
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
    [formatTeamMembers, generateQRCodeValue, onDeleteTeam, onEditTeam, teams]
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
