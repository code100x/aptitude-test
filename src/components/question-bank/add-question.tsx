'use client'
import { QuestionFormSchema, questionFormType } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '../ui/select'
import { addQuestionsToBank } from '@/actions/question-bank'
import { toast } from 'sonner'

export function AddQuesitons({ examId }: { examId: string }) {
  const form = useForm<questionFormType>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: {
      text: '',
      options: ['', '', '', ''],
    },
  })

  const onSubmit = async (data: questionFormType) => {
    try {
      const res = await addQuestionsToBank(examId, data)
      toast.success('Question Saved')
      form.reset()
    } catch (error) {
      toast.error('failed! PLease Try Again Later')
    }
  }
  const optionsIndices = Array.from({ length: 4 }, (_, index) => index)

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <p className='text-base font-bold text-center text-blue-900 dark:text-purple-900'>
            changing Tabs will result in loss of unsaved data.
          </p>
          <FormField
            control={form.control}
            name='text'
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Textarea
                    placeholder='Enter Your Questions Here'
                    {...field}
                  ></Textarea>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-wrap gap-4'>
            {optionsIndices.map((index) => (
              <div key={index}>
                <FormField
                  control={form.control}
                  name={`options.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Option {index + 1}</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter Here' {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <div className=' mt-4 '>
            <FormField
              control={form.control}
              name='correctAnswer'
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value, 10))}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder='Correct Option'
                        className='border p-2 '
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='0'>1</SelectItem>
                    <SelectItem value='1'>2</SelectItem>
                    <SelectItem value='2'>3</SelectItem>
                    <SelectItem value='3'>4</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className='text-end'>
            <Button type='submit' className='mt-4'>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
