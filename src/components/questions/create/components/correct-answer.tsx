import { UseFormRegister, FieldErrors, FieldArrayWithId } from 'react-hook-form'
import { createQuestionsValues } from '@/schemas'

interface CorrectAnswerSelectProps {
  item: FieldArrayWithId<createQuestionsValues, 'questions'>
  index: number
  register: UseFormRegister<createQuestionsValues>
  errors: FieldErrors<createQuestionsValues>
}

const CorrectAnswerSelect = ({
  item,
  index,
  register,
  errors,
}: CorrectAnswerSelectProps) => (
  <div className='mt-4'>
    <label
      htmlFor={`questions.${index}.correctAnswer`}
      className='block text-md font-medium text-gray-700 dark:text-white'
    >
      Correct Answer
    </label>
    <select
      {...register(`questions.${index}.correctAnswer` as const, {
        valueAsNumber: true,
      })}
      className='mt-1 block w-full border border-gray-300 rounded-md p-2'
    >
      {item.options.map((_, optionIndex) => (
        <option key={optionIndex} value={optionIndex}>
          Option {optionIndex + 1}
        </option>
      ))}
    </select>
    {errors.questions?.[index]?.correctAnswer && (
      <span className='text-red-500'>
        {errors.questions[index]?.correctAnswer?.message}
      </span>
    )}
  </div>
)

export default CorrectAnswerSelect
