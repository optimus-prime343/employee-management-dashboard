import { MantineProvider, MantineProviderProps } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import type { AppProps } from 'next/app'
import { useMemo, useState } from 'react'

dayjs.extend(LocalizedFormat)

export default function App({ Component, pageProps }: AppProps) {
  const [client] = useState(() => new QueryClient())
  const mantineTheme = useMemo<MantineProviderProps['theme']>(
    () => ({
      primaryColor: 'yellow',
    }),
    []
  )
  return (
    <MantineProvider theme={mantineTheme} withGlobalStyles withNormalizeCSS>
      <Notifications position='top-center' />
      <ModalsProvider
        labels={{
          confirm: 'Confirm',
          cancel: 'Cancel',
        }}
        modalProps={{ centered: true }}
      >
        <QueryClientProvider client={client}>
          <ReactQueryDevtools />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  )
}
