import { Paper, Tabs } from '@mantine/core'

import { EmployeeView } from '@/components/employee/employee-view'
import { TeamEmployeeCount } from '@/components/misc/team-employee-count'
import { TeamView } from '@/components/team/team-view'
import { BaseLayout } from '@/layouts/base-layout'

const TEAMS = 'Teams'
const EMPLOYEES = 'Employees'

function HomePage() {
  return (
    <BaseLayout contentTitle='Manage Users'>
      <TeamEmployeeCount />
      <Paper p='md'>
        <Tabs defaultValue={TEAMS}>
          <Tabs.List>
            <Tabs.Tab value={TEAMS}>{TEAMS}</Tabs.Tab>
            <Tabs.Tab value={EMPLOYEES}>{EMPLOYEES}</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value={TEAMS}>
            <TeamView />
          </Tabs.Panel>
          <Tabs.Panel value={EMPLOYEES}>
            <EmployeeView />
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </BaseLayout>
  )
}
export default HomePage
