import { useMutation } from '@tanstack/react-query'
import { FirebaseError } from 'firebase/app'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { firebaseStorage } from '@/lib/firebase'

export interface UploadFileParams {
  file: File | null
  directory?: string
}
export const useUploadFile = () => {
  return useMutation<string, Error, UploadFileParams>({
    mutationFn: async ({ file, directory = 'images' }) => {
      if (!file) return Promise.resolve('')
      try {
        const storageURL = `/${directory}/${crypto.randomUUID()}`
        const storageRef = ref(firebaseStorage, storageURL)
        await uploadBytes(storageRef, file)
        const downloadUrl = await getDownloadURL(storageRef)
        return downloadUrl
      } catch (error) {
        if (error instanceof FirebaseError) {
          throw new Error(error.message)
        }
        throw new Error('Failed to upload file')
      }
    },
  })
}
