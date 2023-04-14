import { StatusCodes } from 'http-status-codes'

import { db } from '@/lib/db'
import { createHandlerFactory } from '@/utils/handler'

const handler = createHandlerFactory()

handler.get(async (_request, response) => {
  const teamCount = await db.team.count()
  response.status(StatusCodes.OK).json({
    data: teamCount,
  })
  response.end()
})
export default handler
