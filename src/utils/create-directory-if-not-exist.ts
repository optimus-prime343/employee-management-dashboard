import fs from 'node:fs'

export const createDirectoryIfNotExist = async (
  directoryPath: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.opendir(directoryPath, (error, directory) => {
      if (error) {
        if (error.code === 'ENOENT') {
          fs.mkdir(directoryPath, { recursive: true }, createDirError => {
            if (error) return reject(createDirError)
            return resolve('Directory created successfully')
          })
        }
      }
      if (directory) void directory.close()
      return resolve('Directory already exists')
    })
  })
}
