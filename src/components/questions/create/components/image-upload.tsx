import { ChangeEvent, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Image as ImageIcon } from 'lucide-react'
import { CustomTooltip } from '@/components/ui/tooltip'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { createQuestionsValues } from '@/schemas'

interface ImageUploadProps {
  index: number
  onImageUpload: (index: number, image: string | null) => void
  register: UseFormRegister<createQuestionsValues>
  setValue: UseFormSetValue<createQuestionsValues>
}

const MAX_FILE_SIZE = 5 * 1024 * 1024

const ImageUpload = ({
  index,
  onImageUpload,
  register,
  setValue,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert('File size exceeds the maximum limit of 5MB.')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        // Pass both the index and the image data back to the parent
        onImageUpload(index, reader.result as string)
        setValue(`questions.${index}.image`, reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <>
      <CustomTooltip
        trigger={
          <Button
            type='button'
            onClick={handleButtonClick}
            className='flex items-center justify-center bg-blue-500 text-white p-2 rounded-md'
          >
            <ImageIcon />
          </Button>
        }
        content={<span>Upload Image</span>}
        side='right'
        sideOffset={8}
      />

      <input
        {...register(`questions.${index}.image` as const)}
        type='file'
        accept='image/*'
        hidden
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
    </>
  )
}

export default ImageUpload
