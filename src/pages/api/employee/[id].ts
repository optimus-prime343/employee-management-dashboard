/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import multer from 'multer'

import { db } from '@/lib/db'
import { getEmployeeFullName } from '@/utils/employee'
import { createHandlerFactory } from '@/utils/handler'
import { uploadImage } from '@/utils/upload-image'

dayjs.extend(CustomParseFormat)

const handler = createHandlerFactory()

handler
  .use(multer().any())
  .get(async (request, response) => {
    try {
      const { id } = request.query
      const employee = await db.employee.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      })
      response.status(StatusCodes.OK).json({
        data: employee,
      })
    } catch (error) {
      response.status(StatusCodes.NOT_FOUND).json({
        data: error instanceof Error ? error.message : 'Employee not found',
      })
    }
  })
  .patch(async (request, response) => {
    try {
      const { id } = request.query as { id: string }
      const {
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        email,
        workStartsAt,
        workEndsAt,
        position,
        teamId,
        isBillable,
        billableHours,
      } = request.body as Record<
        keyof Prisma.EmployeeUncheckedUpdateInput,
        string
      >
      const profileImageFile = request.files?.[0]
      const profileImageURL = await uploadImage(
        profileImageFile,
        '/images/employees'
      )
      const updatedEmployee = await db.employee.update({
        where: { id: Number(id) },
        data: {
          firstName,
          middleName: middleName || null,
          lastName,
          dateOfBirth: new Date(dateOfBirth),
          gender,
          address,
          phoneNumber,
          email,
          workStartsAt: dayjs(workStartsAt, 'HH:mm').toDate(),
          workEndsAt: dayjs(workEndsAt, 'HH:mm').toDate(),
          position,
          teamId: JSON.parse(teamId) ?? null,
          isBillable: JSON.parse(isBillable) ?? false,
          billableHours: JSON.parse(billableHours) ?? 40,
          profileImage: profileImageURL ?? undefined,
        },
      })
      response.status(StatusCodes.OK).json({
        data: `Successfully updated employee ${getEmployeeFullName(
          updatedEmployee
        )}`,
      })
    } catch (error) {
      response.status(StatusCodes.BAD_REQUEST).json({
        data:
          error instanceof Error
            ? error.message
            : getReasonPhrase(StatusCodes.BAD_REQUEST),
      })
    }
  })
export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
}

export default handler
