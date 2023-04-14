import { StatusCodes } from 'http-status-codes'

import { db } from '@/lib/db'
import { createHandlerFactory } from '@/utils/handler'

const handler = createHandlerFactory()

handler.get(async (request, response) => {
  const employees = await db.employee.findMany({
    include: {
      team: true,
    },
  })
  response.status(StatusCodes.OK).json({
    data: employees,
  })
  response.end()
})
export default handler
