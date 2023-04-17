import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const createDirectoryIfNotExists = async (directoryPath: string) => {
  await fs.opendir(directoryPath).catch(async error => {
    const { code } = error as NodeJS.ErrnoException
    if (code === 'ENOENT') {
      await fs.mkdir(directoryPath, { recursive: true })
    }
  })
}

export const uploadImage = async (
  file: Express.Multer.File | undefined,
  uploadPath: string
): Promise<string | null> => {
  if (file === undefined) return Promise.resolve(null)
  const fileName = `${crypto.randomUUID()}.png`
  const imagePathDB = `${uploadPath}/${fileName}`
  const imageDirectory = path.join(process.cwd(), 'public', uploadPath)
  await createDirectoryIfNotExists(imageDirectory)
  const imageStoragePath = path.join(imageDirectory, fileName)
  await sharp(file.buffer)
    .png({
      quality: 95,
    })
    .resize(600)
    .toFile(imageStoragePath)
  return Promise.resolve(imagePathDB)
}
