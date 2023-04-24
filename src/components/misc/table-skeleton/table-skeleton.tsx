import { Skeleton } from '@mantine/core'
import { useMemo } from 'react'

export interface TableSkeletonProps {
  rows?: number
  columns?: number
}
export function TableSkeleton({ rows = 5, columns = 10 }: TableSkeletonProps) {
  const rowElements = useMemo<number[]>(
    () => Array.from({ length: rows }, (_, i) => i),
    [rows]
  )
  const columnElements = useMemo<number[]>(
    () => Array.from({ length: columns }, (_, i) => i),
    [columns]
  )
  return (
    <>
      {columnElements.map(column => (
        <tr key={column.toString()}>
          {rowElements.map(row => (
            <td key={row.toString()}>
              <Skeleton height={20} width={120} />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}
