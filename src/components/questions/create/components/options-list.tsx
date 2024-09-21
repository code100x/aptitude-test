import { UseFormRegister, FieldErrors, FieldArrayWithId } from 'react-hook-form'
import { createQuestionsValues } from '@/schemas'

interface OptionsListProps {
  item: FieldArrayWithId<createQuestionsValues, 'questions'>
  index: number
  register: UseFormRegister<createQuestionsValues>
  errors: FieldErrors<createQuestionsValues>
}

const OptionsList = ({ item, index, register, errors }: OptionsListProps) => (
  <div className='mb-2'>
    {item.options.map((_, optionIndex) => (
      <div key={optionIndex} className='flex items-center mb-1'>
        <input
          type='text'
          {...register(`questions.${index}.options.${optionIndex}` as const)}
          className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus-visible:border-red-500'
          placeholder={`Option ${optionIndex + 1}`}
        />
      </div>
    ))}
    {errors.questions?.[index]?.options && (
      <span className='text-red-500'>
        {errors.questions[index]?.options?.message}
      </span>
    )}
  </div>
)

export default OptionsList
