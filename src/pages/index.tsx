import { TeamEmployeeCount } from '@/components/misc/team-employee-count'
import { BaseLayout } from '@/layouts/base-layout'

function HomePage() {
  return (
    <BaseLayout contentTitle='Manage Users'>
      <TeamEmployeeCount />
    </BaseLayout>
  )
}
export default HomePage
