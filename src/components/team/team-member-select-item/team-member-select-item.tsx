import { Avatar, Badge, Box, BoxProps, Group, Text } from '@mantine/core'
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
>(({ label, description, image, isAlreadyOnATeam, ...rest }, ref) => {
  return (
    <Box ref={ref} {...rest}>
      <Group align='flex-start' noWrap>
        <Avatar radius='xl' src={image ?? '/images/default_user.png'} />
        <Box sx={{ flex: 1 }}>
          <Text>{label}</Text>
          <Text color='dimmed' size='xs'>
            {description}
          </Text>
        </Box>
        <Badge color={isAlreadyOnATeam ? 'red' : 'green'} fw='bold'>
          {isAlreadyOnATeam ? 'Not Available' : 'Available'}
        </Badge>
      </Group>
    </Box>
  )
})
TeamMemberSelectItem.displayName = 'TeamMemberSelectItem'
