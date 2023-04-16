import { Alert, LoadingOverlay } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { TeamForm } from '@/components/team/team-form'
import { QUERY_KEYS } from '@/constants/query-keys'
import { useEditTeam, useTeamDetail } from '@/hooks/team'
import { BaseLayout } from '@/layouts/base-layout'
import { TeamFormData } from '@/schemas/team'

export default function EditTeam() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const id = router.query.teamId as string
  const { data: teamDetail, isLoading: isTeamDetailLoading } = useTeamDetail(id)
  const editTeam = useEditTeam()

  const handleEditTeam = useCallback(
    (editTeamFormData: TeamFormData) => {
      editTeam.mutate(
        {
          id,
          editTeamFormData,
        },
        {
          onSuccess: message => {
            showNotification({
              title: 'Success',
              message,
              color: 'teal',
            })
            void queryClient.invalidateQueries(
              QUERY_KEYS.team.getTeamDetail(id)
            )
            void router.push({
              pathname: '/',
              query: {
                activeTab: 'Teams',
              },
            })
          },
          onError: error => {
            showNotification({
              title: 'Error',
              message: error.message,
              color: 'red',
            })
          },
        }
      )
    },
    [editTeam, id, queryClient, router]
  )

  return (
    <BaseLayout contentTitle='Edit Team' title='Edit team'>
      <LoadingOverlay
        overlayBlur={6}
        sx={{ position: 'fixed', inset: 0 }}
        visible={isTeamDetailLoading}
      />
      {teamDetail !== undefined ? (
        <TeamForm
          isEditButtonLoading={editTeam.isLoading}
          mode='edit'
          onEditTeam={handleEditTeam}
          team={teamDetail}
        />
      ) : (
        <Alert color='red' title='Team not found'>
          Team with id {id} not found
        </Alert>
      )}
    </BaseLayout>
  )
}
