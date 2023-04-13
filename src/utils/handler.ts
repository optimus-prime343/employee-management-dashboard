import { getReasonPhrase, StatusCodes } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const onError = (
  error: Error,
  _request: NextApiRequest,
  response: NextApiResponse
) => {
  console.error(error)
  response.status(StatusCodes.INTERNAL_SERVER_ERROR).end({
    error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
  })
}

const onNoMatch = (_request: NextApiRequest, response: NextApiResponse) => {
  response.status(StatusCodes.NOT_FOUND).end({
    error: getReasonPhrase(StatusCodes.NOT_FOUND),
  })
}
export const handler = nc<NextApiRequest, NextApiResponse>({
  onError,
  onNoMatch,
})
