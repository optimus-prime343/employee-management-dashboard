import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var db: PrismaClient
}

const db = global.db ?? new PrismaClient()

if (process.env.NODE_ENV === 'development') global.db = db

export { db }
