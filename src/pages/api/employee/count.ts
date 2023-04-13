import { StatusCodes } from 'http-status-codes'

import { db } from '@/lib/db'
import { handler } from '@/utils/handler'

handler.get(async (_request, response) => {
  const employeeCount = await db.employee.count()
  response.status(StatusCodes.OK).json({
    data: employeeCount,
  })
})

export default handler
