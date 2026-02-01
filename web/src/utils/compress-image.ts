interface CompressImageParams {
  file: File
  maxWidth?: number
  maxHeight?: number
  quality?: number
}
function convertToWebp(fileName: string) {
   // Extrai a extensão com base no final do nome
  const lastDoItIndex = fileName.lastIndexOf('.')

  // Valida e modifica se o filename for diferente de .webp
  if (lastDoItIndex === -1) {
    return `${fileName}.webp`
  }
  
  // Modifica a extensão para .webp
  return `${fileName.substring(0, lastDoItIndex)}.webp`
 }

export function compressImage({ file, maxWidth = Number.POSITIVE_INFINITY, maxHeight = Number.POSITIVE_INFINITY, quality = 1}: CompressImageParams) {
  const allowedFileType = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]

  if (!allowedFileType.includes(file.type)) {
    throw new Error("Imagem format not supported.")
  }


  return new Promise<File>((resolve, reject) => {

    const reader = new FileReader()

    reader.onload = event => {
      const compressedImage = new Image()

      compressedImage.onload = () => {
        const canvas = document.createElement('canvas')

        let width = compressedImage.width
        let height = compressedImage.height

        if (width > height) {
          if (width > maxWidth) {
            width = maxWidth
            height *= maxWidth / width
          }
        } else {
          if (height > maxHeight) {
            height = maxHeight
            width *= maxHeight / height
          }
        }

        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d')

        if (!context) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        context.drawImage(compressedImage, 0, 0, width, height)

        canvas.toBlob(blob => {
          if (!blob) {
            reject (new Error('Failed to compress image'))
            return
          }

          const compressedFile = new File(
            [blob],
            convertToWebp(file.name),
            {
              type: 'image/webp',
              lastModified: Date.now()
            }
          )

          resolve(compressedFile)
        },
          'image/webp',
          quality
        )
      }

      compressedImage.src = event.target?.result as string
    }

    reader.readAsDataURL(file)
  })


}