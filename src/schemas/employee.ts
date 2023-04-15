import { Prisma } from '@prisma/client'
import { z } from 'zod'

export const PHONE_NUMBER_REGEX =
  /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

export const EmployeeSchema = z.object<
  Omit<
    Record<keyof Prisma.EmployeeUncheckedCreateInput, z.ZodTypeAny>,
    'id' | 'profileImage'
  >
>({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  dateOfBirth: z.date({ coerce: true }),
  gender: z.string(),
  address: z.string(),
  phoneNumber: z.string().refine(value => PHONE_NUMBER_REGEX.test(value), {
    message: 'Invalid phone number',
  }),
  email: z.string().email(),
  workStartsAt: z.string(),
  workEndsAt: z.string(),
  position: z.string(),
  isBillable: z.boolean(),
  billableHours: z.number({ coerce: true }).default(40),
  teamId: z.number({ coerce: true }),
})
export type EmployeeFormData = z.infer<typeof EmployeeSchema>
