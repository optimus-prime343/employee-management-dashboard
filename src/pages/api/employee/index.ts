import { StatusCodes } from 'http-status-codes'

import { db } from '@/lib/db'
import { createHandlerFactory } from '@/utils/handler'

const handler = createHandlerFactory()

handler
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

export default handler
