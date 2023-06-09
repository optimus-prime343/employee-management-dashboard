import {
  Anchor,
  AppShell,
  Breadcrumbs,
  Burger,
  createStyles,
  Header,
  MediaQuery,
  Navbar,
  Stack,
  Title,
  useMantineTheme,
} from '@mantine/core'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useMemo, useState } from 'react'

import { convertHyphenToTitleCase } from '@/utils/casing'

export interface BaseLayoutProps {
  title?: string
  showBreadcrumbs?: boolean
  children: ReactNode
}
export function BaseLayout({
  title,
  showBreadcrumbs = true,
  children,
}: BaseLayoutProps) {
  const router = useRouter()
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  const { classes } = useStyles()

  const breadCrumbItems = useMemo<JSX.Element[]>(() => {
    const routeItems = router.pathname
      .split('/')
      .filter(Boolean)
      .map(item => ({
        label: convertHyphenToTitleCase(item),
        href: `/${item}`,
      }))
    const homeItem = { href: '/', label: 'Home' }
    const items = [homeItem, ...routeItems]
    return items.map(item => (
      <Anchor key={item.href} component={Link} href={item.href}>
        {item.label}
      </Anchor>
    ))
  }, [router.pathname])

  return (
    <>
      <Head>
        <title>{title ?? 'Employee Team Management'}</title>
      </Head>
      <AppShell
        header={
          <Header height={{ base: 50, md: 70 }} p='md'>
            <div className={classes.centerContent}>
              <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                <Burger
                  color={theme.colors.gray[6]}
                  mr='xl'
                  onClick={() => setOpened(prevOpened => !prevOpened)}
                  opened={opened}
                  size='sm'
                />
              </MediaQuery>

              <Title order={4}>NAVIGATION BAR</Title>
            </div>
          </Header>
        }
        layout='alt'
        navbar={
          <Navbar
            className={classes.centerContent}
            hidden={!opened}
            hiddenBreakpoint='sm'
            p='md'
            width={{ sm: 200, lg: 300 }}
          >
            <Title order={4}>SIDEBAR</Title>
          </Navbar>
        }
        navbarOffsetBreakpoint='sm'
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
      >
        <Stack>
          {showBreadcrumbs ? (
            <Breadcrumbs>{breadCrumbItems}</Breadcrumbs>
          ) : null}
          {title ? <Title order={4}>{title}</Title> : null}
          {children}
        </Stack>
      </AppShell>
    </>
  )
}
const useStyles = createStyles(() => ({
  centerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}))
