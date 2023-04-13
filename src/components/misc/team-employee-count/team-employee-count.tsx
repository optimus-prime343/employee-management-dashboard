import { Group } from '@mantine/core'

import { useEmployeeCount } from '@/hooks/employee'
import { useTeamCount } from '@/hooks/team'

import { Count } from './count'

export function TeamEmployeeCount() {
  const teamCount = useTeamCount()
  const employeeCount = useEmployeeCount()
  return (
    <Group spacing='md'>
      <Count bg='blue' title='Teams' value={teamCount.data} />
      <Count bg='yellow' title='Employees' value={employeeCount.data} />
    </Group>
  )
}
