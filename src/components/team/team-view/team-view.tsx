import { Box, Button, createStyles, TextInput } from '@mantine/core'
import { IconFilter, IconPlus, IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import { ManHourRangeFilter } from '@/components/team/man-hour-range-filter'

export function TeamView() {
  const [search, setSearch] = useState('')
  const [teamManHourRange, setTeamManHourRange] = useState<
    [number, number] | undefined
  >(undefined)

  const handleClearFilter = useCallback(
    () => setTeamManHourRange(undefined),
    []
  )
  const { classes } = useStyles()
  return (
    <Box py='md'>
      <Box className={classes.searchContainer}>
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
