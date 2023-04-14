import {
  Button,
  Group,
  Popover,
  RangeSlider,
  SliderProps,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { ReactNode, useCallback, useMemo, useState } from 'react'

export interface ManHourRangeFilterProps {
  target: ReactNode
  onApply: (value: [number, number]) => void
  onClearFilter: () => void
}

type Mark = NonNullable<SliderProps['marks']>[0]

export function ManHourRangeFilter({
  target,
  onApply,
  onClearFilter,
}: ManHourRangeFilterProps) {
  const [range, setRange] = useState<[number, number]>([0, 0])
  const marks = useMemo<Mark[]>(
    () => [
      {
        value: 0,
        label: '0',
      },
    ],
    []
  )
  const handleApply = useCallback(() => onApply(range), [onApply, range])

  return (
    <Popover width={300}>
      <Popover.Target>{target}</Popover.Target>
      <Popover.Dropdown>
        <Stack>
          <Title order={4}>Filter</Title>
          <Text>Choose man hour range</Text>
          <RangeSlider marks={marks} onChange={setRange} value={range} />
          <Group mt='md' spacing='xs'>
            <Button onClick={handleApply}>Apply</Button>
            <Button color='red' onClick={onClearFilter} variant='white'>
              Clear filter
            </Button>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}
