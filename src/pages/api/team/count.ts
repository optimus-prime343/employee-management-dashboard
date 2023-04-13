import { StatusCodes } from 'http-status-codes'

import { db } from '@/lib/db'
import { handler } from '@/utils/handler'

handler.get(async (_request, response) => {
  const teamCount = await db.team.count()
  return response.status(StatusCodes.OK).json({
    data: teamCount,
  })
})
export default handler
