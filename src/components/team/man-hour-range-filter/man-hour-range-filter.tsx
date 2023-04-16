import {
  Button,
  Flex,
  Group,
  Popover,
  RangeSlider,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { ReactNode, useCallback, useState } from 'react'

export interface ManHourRangeFilterProps {
  showManHourRangeFilter: boolean
  onShowManHourRangeFilterChange: (showManHourRangeFilter: boolean) => void
  onManHourRangeChange: (range: [number, number] | undefined) => void
  target: ReactNode
}

const MIN_RANGE = 5000
const MAX_RANGE = 20000
const STEP = 1000

export function ManHourRangeFilter({
  showManHourRangeFilter,
  onShowManHourRangeFilterChange,
  onManHourRangeChange,
  target,
}: ManHourRangeFilterProps) {
  const [range, setRange] = useState<[number, number] | undefined>(undefined)

  const handleSelectManHourRange = useCallback(
    (newRange: [number, number] | undefined) => {
      onManHourRangeChange(newRange)
      onShowManHourRangeFilterChange(false)
    },
    [onManHourRangeChange, onShowManHourRangeFilterChange]
  )
  return (
    <Popover
      onChange={onShowManHourRangeFilterChange}
      opened={showManHourRangeFilter}
      width={350}
      withArrow
    >
      <Popover.Target>{target}</Popover.Target>
      <Popover.Dropdown>
        <Stack spacing='xs'>
          <Title order={4}>Filter</Title>
          <Text>Choose man hour range</Text>
          <RangeSlider
            max={MAX_RANGE}
            min={MIN_RANGE}
            onChange={setRange}
            step={STEP}
            value={range}
          />
          <Flex justify='space-between' mb='xs'>
            <Text fw='bold'>5000 Hours</Text>
            <Text fw='bold'>20,000 Hours</Text>
          </Flex>
          <Group spacing='xs'>
            <Button onClick={() => handleSelectManHourRange(range)}>
              Apply
            </Button>
            <Button
              color='red'
              onClick={() => handleSelectManHourRange(undefined)}
              variant='white'
            >
              Clear filter
            </Button>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}
