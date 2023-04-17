import crypto from 'node:crypto'
import path from 'node:path'

import sharp from 'sharp'

export const uploadImage = async (
  file: Express.Multer.File | undefined,
  uploadPath: string
): Promise<string | null> => {
  if (file === undefined) return Promise.resolve(null)
  const fileName = `${crypto.randomUUID()}.png`
  const imagePathDB = `${uploadPath}/${fileName}`
  const imageStoragePath = path.join(
    process.cwd(),
    'public',
    uploadPath,
    fileName
  )
  await sharp(file.buffer)
    .png({
      quality: 95,
    })
    .resize(600)
    .toFile(imageStoragePath)
  return Promise.resolve(imagePathDB)
}
