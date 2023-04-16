import { Prisma } from '@prisma/client'
import { z } from 'zod'

export const PHONE_NUMBER_REGEX =
  /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

const nonEmptyString = z
  .string()
  .nonempty({ message: 'This field is required' })

export const EmployeeSchema = z.object<
  Omit<
    Record<keyof Prisma.EmployeeUncheckedCreateInput, z.ZodTypeAny>,
    'id' | 'profileImage'
  >
>({
  firstName: nonEmptyString,
  middleName: z.string().optional(),
  lastName: nonEmptyString,
  dateOfBirth: nonEmptyString,
  gender: nonEmptyString,
  address: nonEmptyString,
  phoneNumber: z.string().refine(value => PHONE_NUMBER_REGEX.test(value), {
    message: 'Invalid phone number',
  }),
  email: z.string().email(),
  workStartsAt: nonEmptyString,
  workEndsAt: nonEmptyString,
  position: nonEmptyString,
  isBillable: z.boolean(),
  billableHours: z.number().default(40),
  teamId: z.string().optional().default(''),
})
export type EmployeeFormData = z.infer<typeof EmployeeSchema>
