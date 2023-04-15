import { z } from 'zod'

export const TeamSchema = z.object({
  name: z.string(),
  members: z.array(z.string()).default([]),
  password: z.string(),
  totalManHours: z.number(),
})
export type TeamFormData = z.infer<typeof TeamSchema>
