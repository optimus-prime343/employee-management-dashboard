import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import type { AppProps } from 'next/app'
import { useState } from 'react'

dayjs.extend(LocalizedFormat)

export default function App({ Component, pageProps }: AppProps) {
  const [client] = useState(() => new QueryClient())
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools />
        <Component {...pageProps} />
      </QueryClientProvider>
    </MantineProvider>
  )
}
