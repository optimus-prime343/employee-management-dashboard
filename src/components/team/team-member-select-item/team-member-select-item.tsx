import { Avatar, Badge, Box, BoxProps, Flex, Group, Text } from '@mantine/core'
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
TeamMemberSelectItem.displayName = 'TeamMemberSelectItem'
