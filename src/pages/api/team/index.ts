import { StatusCodes } from 'http-status-codes'

import { db } from '@/lib/db'
import { createHandlerFactory } from '@/utils/handler'

const handler = createHandlerFactory()

handler.get(async (request, response) => {
  const teams = await db.team.findMany({
    include: {
      members: true,
    },
  })
  response.status(StatusCodes.OK).json({
    data: teams,
  })
})

export default handler
