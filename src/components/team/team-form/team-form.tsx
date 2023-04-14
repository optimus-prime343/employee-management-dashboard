export interface AddTeamFormProps {
  mode: 'add'
}
export interface EditTeamFormProps {
  mode: 'edit'
  teamId: string
}
export type TeamFormProps = AddTeamFormProps | EditTeamFormProps

export function TeamForm(props: TeamFormProps) {
  return <form />
}
