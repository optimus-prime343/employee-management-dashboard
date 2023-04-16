import {
  Box,
  Button,
  createStyles,
  Pagination,
  Text,
  TextInput,
} from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconFilter, IconPlus, IconSearch } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { ManHourRangeFilter } from '@/components/team/man-hour-range-filter'
import { TeamListTable } from '@/components/team/team-list-table'
import { QUERY_KEYS } from '@/constants/query-keys'
import { TeamWithMembers, useDeleteTeam, useTeams } from '@/hooks/team'

export function TeamView() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [search, setSearch] = useDebouncedState('', 500)
  const [showManHourRangeFilter, setShowManHourRangeFilter] = useState(false)
  const [teamManHourRange, setTeamManHourRange] = useState<
    [number, number] | undefined
  >(undefined)

  const [activePage, setActivePage] = useState(1)

  const { data: paginatedTeams, refetch: refetchTeams } = useTeams({
    page: activePage,
    search,
    teamManHourRangeStart: teamManHourRange?.[0],
    teamManHourRangeEnd: teamManHourRange?.[1],
  })
  const deleteTeam = useDeleteTeam()

  const handleEditTeam = useCallback(
    (team: TeamWithMembers) => {
      void router.push({
        pathname: '/edit-team',
        query: {
          teamId: team.id,
        },
      })
    },
    [router]
  )
  const openConfirmDeleteTeamModal = useCallback(
    (team: TeamWithMembers) => {
      openConfirmModal({
        title: 'Delete Team',
        children: (
          <Text>
            Are you sure you want to delete team{' '}
            <Text component='span' fw='bold'>
              {team.name}
            </Text>
            ?
          </Text>
        ),
        onConfirm: () => {
          deleteTeam.mutate(team.id.toString(), {
            onSuccess: message => {
              showNotification({
                title: 'Success',
                message,
                color: 'teal',
              })
              Promise.all([
                queryClient.invalidateQueries(QUERY_KEYS.team.getTeamCount),
                refetchTeams(),
              ]).catch(error => {
                console.error(error)
              })
            },
            onError: error => {
              showNotification({
                title: 'Error',
                message: error.message,
                color: 'red',
              })
            },
          })
        },
      })
    },
    [deleteTeam, queryClient, refetchTeams]
  )
  const { classes } = useStyles()
  return (
    <Box py='md'>
      <Box className={classes.searchContainer} mb='md'>
        <TextInput
          defaultValue={search}
          icon={<IconSearch />}
          onChange={event => setSearch(event.currentTarget.value)}
          placeholder='Search item'
        />
        <ManHourRangeFilter
          onManHourRangeChange={setTeamManHourRange}
          onShowManHourRangeFilterChange={setShowManHourRangeFilter}
          showManHourRangeFilter={showManHourRangeFilter}
          target={
            <Button
              leftIcon={<IconFilter />}
              onClick={() => setShowManHourRangeFilter(opened => !opened)}
              variant='outline'
            >
              Filter
            </Button>
          }
        />
        <Box sx={{ flex: 1 }} />
        <Button component={Link} href='/add-team' leftIcon={<IconPlus />}>
          Add Team
        </Button>
      </Box>
      <TeamListTable
        onDeleteTeam={openConfirmDeleteTeamModal}
        onEditTeam={handleEditTeam}
        teams={paginatedTeams?.data ?? []}
      />
      <Pagination
        mt='md'
        onChange={setActivePage}
        position='right'
        total={paginatedTeams?.totalPages ?? 0}
        value={activePage}
      />
    </Box>
  )
}
const useStyles = createStyles(theme => ({
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
}))
