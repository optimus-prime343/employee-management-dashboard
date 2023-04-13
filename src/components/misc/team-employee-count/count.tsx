import { Box, BoxProps, createStyles, Title } from '@mantine/core'
import { IconUsers } from '@tabler/icons-react'
import { ReactNode } from 'react'

interface CountProps extends BoxProps {
  title: string
  value: number
  icon?: ReactNode
}
export function Count({ title, value, icon, className, ...rest }: CountProps) {
  const { classes, cx } = useStyles()
  return (
    <Box className={cx(classes.container, className)} {...rest}>
      <Box>
        <Title order={6}>{title}</Title>
        <Title order={2}>{value}</Title>
      </Box>
      <Box className={classes.iconContainer}>{icon ?? <IconUsers />}</Box>
    </Box>
  )
}
const useStyles = createStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '18rem',
    color: theme.white,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
  },
  iconContainer: {
    borderRadius: theme.radius.sm,
    paddingInline: theme.spacing.xs,
    paddingBlock: theme.spacing.xs,
  },
}))
