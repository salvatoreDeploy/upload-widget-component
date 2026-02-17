import axios from "axios"

interface UploadFileToStogareParams {
  file: File,
  onProgress: (sizeInBytes: number) => void
}

interface UploadFileStorageOpts {
  signal?: AbortSignal
}

export async function uploadFileToStorage({ file, onProgress }: UploadFileToStogareParams, opt?:UploadFileStorageOpts) { 
  const data = new FormData()

  data.append('file', file)

  const response = await axios.post<{url:string}>('http://localhost:3333/uploads', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    signal: opt?.signal,
    onUploadProgress(progressEvent) {
      onProgress(progressEvent.loaded)
    },
  })

  return {
    url: response.data.url
  }
}

