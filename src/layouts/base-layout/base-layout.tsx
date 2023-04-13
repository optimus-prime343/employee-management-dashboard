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

export interface BaseLayoutProps {
  /**
   * The title of the page
   */
  title?: string
  /**
   * The title of the content
   */
  contentTitle?: string
  showBreadcrumbs?: boolean
  children: ReactNode
}
export function BaseLayout({
  title,
  contentTitle,
  showBreadcrumbs,
  children,
}: BaseLayoutProps) {
  const router = useRouter()
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  const { classes } = useStyles()

  const breadCrumbItems = useMemo<JSX.Element[]>(() => {
    const items = router.pathname.split('/').filter(Boolean)
    return items.map(item => (
      <Anchor key={item} component={Link} href={`/${item}`}>
        {item}
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
          {contentTitle ? <Title order={4}>{contentTitle}</Title> : null}
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
