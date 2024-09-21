export async function convertImagePathToDataURL(imagePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(imagePath)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          resolve(reader.result as string)
        }
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
      .catch(reject)
  })
}
