import { useEffect, useState } from 'react'
import {
  UseFormRegister,
  UseFormHandleSubmit,
  Control,
  FieldErrors,
  UseFieldArrayRemove,
  UseFieldArrayAppend,
  FieldArrayWithId,
  UseFormSetValue,
  UseFormReset,
} from 'react-hook-form'
import { createQuestionsValues } from '@/schemas'
import { Button } from '@/components/ui/button'
import ImageUpload from './image-upload'
import CorrectAnswerSelect from './correct-answer'
import OptionsList from './options-list'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { CustomTooltip } from '@/components/ui/tooltip'
import { convertImagePathToDataURL } from '@/lib/imagePathToUrl'
import { usePathname } from 'next/navigation'

interface QuestionsFormProps {
  control: Control<createQuestionsValues>
  handleSubmit: UseFormHandleSubmit<createQuestionsValues>
  register: UseFormRegister<createQuestionsValues>
  errors: FieldErrors<createQuestionsValues>
  fields: FieldArrayWithId<createQuestionsValues, 'questions'>[]
  append: UseFieldArrayAppend<createQuestionsValues, 'questions'>
  remove: UseFieldArrayRemove
  onSubmit: (data: createQuestionsValues) => void
  setValue: UseFormSetValue<createQuestionsValues>
  reset: UseFormReset<createQuestionsValues>
}

export default function QuestionsForm({
  control,
  handleSubmit,
  register,
  errors,
  fields,
  append,
  remove,
  onSubmit,
  setValue,
  reset,
}: QuestionsFormProps) {
  const pathname = usePathname()
  const [previewImages, setPreviewImages] = useState<(string | null)[]>([])

  useEffect(() => {
    const convertImages = async () => {
      const updatedQuestions = await Promise.all(
        fields.map(async (question) => {
          if (question.image && typeof question.image === 'string') {
            const imageDataURL = await convertImagePathToDataURL(question.image)
            return { ...question, image: imageDataURL }
          }
          return question
        })
      )

      // Set the preview images state
      setPreviewImages(updatedQuestions.map((q) => q.image))

      // Reset the form with updated questions
      reset({ questions: updatedQuestions })
    }

    convertImages()
  }, [])

  const handleImageUpload = (index: number, image: string | null) => {
    setPreviewImages((prevImages) => {
      const newImages = [...prevImages]
      newImages[index] = image
      return newImages
    })
  }

  const handleRemoveImage = (index: number) => {
    setValue(`questions.${index}.image`, null)
    setPreviewImages((prevImages) => {
      const newImages = [...prevImages]
      newImages[index] = null
      return newImages
    })
  }

  return (
    <div className='container min-w-36 md:min-w-[35rem] mx-auto p-4'>
      <div className='flex flex-col text-center mb-4'>
        <h1 className='text-2xl font-bold text-center'>Create</h1>
        <p className='text-muted-foreground'>Add your questions here.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => (
          <div key={index} className='mb-10'>
            <div className='mb-2 flex items-start'>
              <div className='flex-1'>
                <label
                  htmlFor={`questions.${index}.text`}
                  className='block text-md font-medium text-gray-700 dark:text-white'
                >
                  Question {index + 1}
                </label>
                <textarea
                  {...register(`questions.${index}.text` as const)}
                  className='mt-1 block w-full border border-gray-300 rounded-md p-2'
                  rows={3}
                />
                {errors.questions?.[index]?.text && (
                  <span className='text-red-500'>
                    {errors.questions[index]?.text?.message}
                  </span>
                )}
              </div>

              <div className='flex flex-col gap-2 ml-4 mt-6'>
                <ImageUpload
                  index={index}
                  register={register}
                  onImageUpload={handleImageUpload}
                  setValue={setValue}
                />
                <CustomTooltip
                  trigger={
                    <Button
                      variant={'destructive'}
                      onClick={() => remove(index)}
                      className='px-2'
                    >
                      <Trash2 />
                    </Button>
                  }
                  content={<span>Delete</span>}
                  side='right'
                  sideOffset={8}
                />
              </div>
            </div>

            {/* Display preview image below textarea */}
            {previewImages[index] && (
              <div className='relative flex items-center justify-center w-full p-2'>
                <Image
                  src={previewImages[index] as string}
                  alt={`preview-question-${index}`}
                  width={300}
                  height={300}
                  className='rounded-md'
                />
                {/* Delete Icon for Image */}
                <CustomTooltip
                  trigger={
                    <button
                      type='button'
                      onClick={() => handleRemoveImage(index)}
                      className='absolute top-4 right-28 bg-red-500 text-white p-1 rounded-full'
                    >
                      <Trash2 size={16} />
                    </button>
                  }
                  content={<span>Delete Image</span>}
                  side='right'
                  sideOffset={8}
                />
              </div>
            )}

            {/* Options */}
            <OptionsList
              item={item}
              index={index}
              register={register}
              errors={errors}
            />

            {/* Correct Answer */}
            <CorrectAnswerSelect
              item={item}
              index={index}
              register={register}
              errors={errors}
            />
          </div>
        ))}

        {/* Add Question Button */}
        <div className='flex items-center gap-2'>
          {pathname === '/questions/create' && (
            <Button
              type='button'
              variant={'outline'}
              onClick={() =>
                append({
                  text: '',
                  options: ['', '', '', ''],
                  correctAnswer: 0,
                  image: null,
                })
              }
              className='gap-2 text-blue-500'
            >
              Add Question
            </Button>
          )}

          {/* Submit Form Button */}
          <Button type='submit' className='py-2 px-4 rounded-md'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
