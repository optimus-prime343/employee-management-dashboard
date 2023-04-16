import { StatusCodes } from 'http-status-codes'

import { db } from '@/lib/db'
import { createHandlerFactory } from '@/utils/handler'

const handler = createHandlerFactory()

handler.get(async (request, response) => {
  const members = request.query.members as string | undefined
  const membersArray = members?.split(',') ?? []

  const employeesBillableHours = await db.employee.aggregate({
    _sum: {
      billableHours: true,
    },
    where: {
      id: {
        in: membersArray.map(member => Number(member)),
      },
    },
  })
  // eslint-disable-next-line no-underscore-dangle
  const totalManHoursSum = employeesBillableHours._sum?.billableHours ?? 0
  response.status(StatusCodes.OK).json({
    data: totalManHoursSum,
  })
})

export default handler
