import { getReasonPhrase, StatusCodes } from 'http-status-codes'

import { db } from '@/lib/db'
import { TeamFormData } from '@/schemas/team'
import { createHandlerFactory } from '@/utils/handler'

const handler = createHandlerFactory()

handler
  .get(async (request, response) => {
    const teams = await db.team.findMany({
      include: {
        members: true,
      },
    })
    response.status(StatusCodes.OK).json({
      data: teams,
    })
  })
  .post(async (request, response) => {
    try {
      const { name, password, members, totalManHours } =
        request.body as TeamFormData
      const newTeam = await db.team.create({
        data: {
          name,
          password,
          members: {
            connect: members.map(member => ({ id: Number(member) })),
          },
          totalManHours,
        },
      })
      response.status(StatusCodes.CREATED).json({
        data: `Successfully created new team ${newTeam.name}`,
      })
    } catch (error) {
      console.error(error)
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        data: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      })
    }
  })

export default handler
