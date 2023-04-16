import { getReasonPhrase, StatusCodes } from 'http-status-codes'

import { GetTeamsRequestParams } from '@/hooks/team'
import { db } from '@/lib/db'
import { TeamFormData } from '@/schemas/team'
import { createHandlerFactory } from '@/utils/handler'
import { paginate } from '@/utils/paginate'

const handler = createHandlerFactory()

handler
  .get(async (request, response) => {
    const totalTeamCount = await db.team.count()
    const { search, page, teamManHourRangeStart, teamManHourRangeEnd } =
      request.query as Record<keyof GetTeamsRequestParams, string | undefined>

    const { take, skip, totalPages, nextPage, prevPage } = paginate(
      totalTeamCount,
      Number(page) ?? 1
    )
    const teams = await db.team.findMany({
      include: {
        members: true,
      },
      where: {
        totalManHours: {
          gte: teamManHourRangeStart
            ? Number(teamManHourRangeStart)
            : undefined,
          lte: teamManHourRangeEnd ? Number(teamManHourRangeEnd) : undefined,
        },
        name: {
          contains: search ?? '',
          mode: 'insensitive',
        },
      },
      take,
      skip,
    })
    response.status(StatusCodes.OK).json({
      totalPages,
      nextPage,
      prevPage,
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
