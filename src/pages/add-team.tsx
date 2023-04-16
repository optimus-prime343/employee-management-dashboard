import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { TeamForm } from '@/components/team/team-form'
import { useAddTeam } from '@/hooks/team'
import { BaseLayout } from '@/layouts/base-layout'
import { TeamFormData } from '@/schemas/team'

export default function AddTeamPage() {
  const router = useRouter()
  const addTeam = useAddTeam()
  const handleAddTeam = useCallback(
    (addTeamFormData: TeamFormData) => {
      addTeam.mutate(addTeamFormData, {
        onSuccess: message => {
          void router.push({
            pathname: '/',
            query: {
              activeTab: 'Teams',
            },
          })
          showNotification({
            title: 'Success',
            message,
            color: 'teal',
          })
        },
      })
    },
    [addTeam, router]
  )
  return (
    <BaseLayout showBreadcrumbs title='Add Team'>
      <TeamForm
        isAddButtonLoading={addTeam.isLoading}
        mode='add'
        onAddTeam={handleAddTeam}
      />
    </BaseLayout>
  )
}
