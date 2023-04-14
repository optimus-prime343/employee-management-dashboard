import { StatusCodes } from 'http-status-codes'

import { db } from '@/lib/db'
import { createHandlerFactory } from '@/utils/handler'

const handler = createHandlerFactory()

handler.get(async (_request, response) => {
  const employeeCount = await db.employee.count()
  response.status(StatusCodes.OK).json({
    data: employeeCount,
  })
  response.end()
})

export default handler
