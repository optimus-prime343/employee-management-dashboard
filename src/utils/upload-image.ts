import crypto from 'node:crypto'
import path from 'node:path'

import sharp from 'sharp'

import { createDirectoryIfNotExist } from '@/utils/create-directory-if-not-exist'

export const uploadImage = async (
  file: Express.Multer.File | undefined,
  uploadPath: string
): Promise<string | null> => {
  if (file === undefined) return Promise.resolve(null)
  const fileName = `${crypto.randomUUID()}.png`
  const imagePathDB = `${uploadPath}/${fileName}`
  const imageDirectoryPath = path.join(process.cwd(), 'public', uploadPath)
  const imageStoragePath = path.join(imageDirectoryPath, fileName)
  await createDirectoryIfNotExist(imageDirectoryPath)
  await sharp(file.buffer)
    .png({
      quality: 95,
    })
    .resize(600)
    .toFile(imageStoragePath)
  return Promise.resolve(imagePathDB)
}
