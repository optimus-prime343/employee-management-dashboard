import { Stack, Text } from '@mantine/core'
import { openModal } from '@mantine/modals'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useTeamDetail } from '@/hooks/team/use-team-detail'

export const useShowQRDetail = () => {
  const router = useRouter()
  const { teamId } = router.query
  const { data: team } = useTeamDetail(teamId as string)
  useEffect(() => {
    if (team) {
      openModal({
        title: 'QR code details',
        children: (
          <Stack spacing='xs'>
            <Text>
              Team name :{' '}
              <Text component='span' fw='bold'>
                {team.name}
              </Text>
            </Text>
            <Text>
              Team password :{' '}
              <Text component='span' fw='bold'>
                {team.password}
              </Text>
            </Text>
          </Stack>
        ),
        onClose: () => {
          void router.push('/')
        },
      })
    }
  }, [router, router.query, team])
}
