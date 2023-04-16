import { Stack, Text } from '@mantine/core'
import { openModal } from '@mantine/modals'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useShowQRDetail = () => {
  const router = useRouter()
  useEffect(() => {
    const { name, password } = router.query
    if (name && password) {
      openModal({
        title: 'QR code details',
        children: (
          <Stack spacing='xs'>
            <Text>
              Team name :{' '}
              <Text component='span' fw='bold'>
                {name}
              </Text>
            </Text>
            <Text>
              Team password :{' '}
              <Text component='span' fw='bold'>
                {password}
              </Text>
            </Text>
          </Stack>
        ),
        onClose: () => {
          void router.push('/')
        },
      })
    }
  }, [router, router.query])
}
