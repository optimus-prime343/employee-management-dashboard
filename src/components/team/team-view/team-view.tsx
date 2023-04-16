import { Box, Button, createStyles, Text, TextInput } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconFilter, IconPlus, IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { ManHourRangeFilter } from '@/components/team/man-hour-range-filter'
import { TeamListTable } from '@/components/team/team-list-table'
import { TeamWithMembers, useDeleteTeam, useTeams } from '@/hooks/team'

export function TeamView() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [teamManHourRange, setTeamManHourRange] = useState<
    [number, number] | undefined
  >(undefined)

  const { data: teams, refetch: refetchTeams } = useTeams()
  const deleteTeam = useDeleteTeam()

  const handleClearFilter = useCallback(
    () => setTeamManHourRange(undefined),
    []
  )
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
            onSuccess: () => {
              void refetchTeams()
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
    [deleteTeam, refetchTeams]
  )
  const { classes } = useStyles()
  return (
    <Box py='md'>
      <Box className={classes.searchContainer} mb='md'>
        <TextInput
          icon={<IconSearch />}
          onChange={event => setSearch(event.currentTarget.value)}
          placeholder='Search item'
          value={search}
        />
        <ManHourRangeFilter
          onApply={setTeamManHourRange}
          onClearFilter={handleClearFilter}
          target={
            <Button leftIcon={<IconFilter />} variant='outline'>
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
        teams={teams}
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
