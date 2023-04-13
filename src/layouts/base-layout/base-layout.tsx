import {
  AppShell,
  Burger,
  createStyles,
  Header,
  MediaQuery,
  Navbar,
  Title,
  useMantineTheme,
} from '@mantine/core'
import Head from 'next/head'
import { ReactNode, useState } from 'react'

export interface BaseLayoutProps {
  title?: string
  children: ReactNode
}
export function BaseLayout({ title, children }: BaseLayoutProps) {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  const { classes } = useStyles()
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
        {children}
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
