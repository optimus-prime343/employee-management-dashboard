import { getReasonPhrase, StatusCodes } from 'http-status-codes'

import { db } from '@/lib/db'
import { TeamFormData } from '@/schemas/team'
import { createHandlerFactory } from '@/utils/handler'

const handler = createHandlerFactory()

handler
  .get(async (request, response) => {
    try {
      const team = await db.team.findUniqueOrThrow({
        where: {
          id: Number(request.query.id),
        },
        include: {
          members: true,
        },
      })
      response.status(StatusCodes.OK).json({
        data: team,
      })
    } catch (error) {
      console.error(error)
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        data: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      })
    }
  })
  .patch(async (request, response) => {
    const { name, password, members, totalManHours } =
      request.body as TeamFormData
    // update the team member ids to the new ones and remove the teamId from the
    try {
      const updatedTeam = await db.team.update({
        where: {
          id: Number(request.query.id),
        },
        data: {
          name,
          password,
          members: {
            set: members.map(member => Number(member)).map(id => ({ id })),
          },
          totalManHours,
        },
      })
      response.status(StatusCodes.OK).json({
        data: `Successfully updated team ${updatedTeam.name}`,
      })
    } catch (error) {
      console.error(error)
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        data: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      })
    }
  })
  .delete(async (request, response) => {
    try {
      const deletedTeam = await db.team.delete({
        where: {
          id: Number(request.query.id),
        },
      })
      response.status(StatusCodes.OK).json({
        data: `Successfully deleted team ${deletedTeam.name}`,
      })
    } catch (error) {
      console.error(error)
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        data: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      })
    }
  })
export default handler
