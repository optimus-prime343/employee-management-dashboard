import {
  Avatar,
  Badge,
  Box,
  BoxProps,
  createStyles,
  Flex,
  Group,
  Text,
} from '@mantine/core'
import { forwardRef } from 'react'

export interface TeamMemberSelectItemProps extends BoxProps {
  label: string
  description: string
  image: string | null
  isAlreadyOnATeam: boolean
}
export const TeamMemberSelectItem = forwardRef<
  HTMLDivElement,
  TeamMemberSelectItemProps
>((props, ref) => {
  const { label, description, image, isAlreadyOnATeam, className, ...rest } =
    props
  const { classes, cx } = useStyles()
  return (
    <Box
      ref={ref}
      {...rest}
      className={cx(className, isAlreadyOnATeam ? classes.disabled : undefined)}
    >
      <Flex align='flex-start' justify='space-between' wrap='nowrap'>
        <Group>
          <Avatar radius='xl' src={image ?? '/images/default_user.png'} />
          <Box>
            <Text>{label}</Text>
            <Text color='dimmed' size='xs'>
              {description}
            </Text>
          </Box>
        </Group>
        <Badge color={isAlreadyOnATeam ? 'red' : 'green'} fw='bold'>
          {isAlreadyOnATeam ? 'Not Available' : 'Available'}
        </Badge>
      </Flex>
    </Box>
  )
})
const useStyles = createStyles(() => ({
  disabled: {
    opacity: 0.7,
    pointerEvents: 'none',
  },
}))
TeamMemberSelectItem.displayName = 'TeamMemberSelectItem'
