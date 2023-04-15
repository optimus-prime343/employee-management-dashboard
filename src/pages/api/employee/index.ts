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

// extend the type of NextApiRequest to include the files property
declare module 'next' {
  interface NextApiRequest {
    files?: Express.Multer.File[]
  }
}

const handler = createHandlerFactory()

handler
  .use(multer().any())
  .get(async (request, response) => {
    const employees = await db.employee.findMany({
      include: {
        team: true,
      },
    })
    response.status(StatusCodes.OK).json({
      data: employees,
    })
  })
  .post(async (request, response) => {
    try {
      const profileImageFile = request.files?.[0]
      const profileImageURL = await uploadImage(
        profileImageFile,
        '/images/employees'
      )
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
        keyof Prisma.EmployeeUncheckedCreateInput,
        string
      >
      const newEmployee = await db.employee.create({
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
          profileImage: profileImageURL,
        },
      })
      response.status(StatusCodes.CREATED).json({
        data: `Successfully added a new employee ${getEmployeeFullName(
          newEmployee
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
  .delete(async (request, response) => {
    const { id } = request.query as { id: string }
    await db.employee.delete({
      where: {
        id: Number(id),
      },
    })
    response.status(StatusCodes.OK).json({
      data: 'Successfully deleted the employee',
    })
  })
export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
}
export default handler
