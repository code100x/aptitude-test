import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { getAllQuestions } from '@/actions/questions'
import Loader from '@/components/ui/loader'
import { useGlobalStore } from '@/store'
import { Question } from '@/store/slice/questions'

interface QuestionsTableProps {
  tableClassName?: string
  tableHeadClassName?: string
  tableBodyClassName?: string
  tableContainerClassName?: string
}

const QuestionsTable = ({
  tableClassName,
  tableHeadClassName,
  tableBodyClassName,
  tableContainerClassName,
}: QuestionsTableProps) => {
  const { questions, setQuestions, selectedQuestions, setSelectedQuestions } =
    useGlobalStore()


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getAllQuestions()
        if (response.success) {
          setQuestions(response.questions)
        } else {
          console.error('Failed to fetch questions')
        }
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }

    fetchQuestions()
  }, [])

  const handleCheckboxChange = (question: Question) => {
    setSelectedQuestions((prevSelected) => {
      if (prevSelected.some((q) => q.id === question.id)) {
        return prevSelected.filter((q) => q.id !== question.id)
      } else {
        return [...prevSelected, question]
      }
    })
  }

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedQuestions(questions)
    } else {
      setSelectedQuestions([])
    }
  }

  return (
    <>
      {questions.length > 0 ? (
        <div className='w-full flex flex-col'>
          <div
            id='table-container'
            className={`overflow-auto flex-grow ${tableContainerClassName}`}
          >
            <Table className={`w-full border ${tableClassName}`}>
              <TableHeader
                className={`sticky top-0 z-10 bg-primary ${tableHeadClassName}`}
              >
                <TableRow className='text-md font-medium text-white'>
                  <TableHead>
                    <input
                      type='checkbox'
                      className='form-checkbox'
                      onChange={handleSelectAll}
                      checked={selectedQuestions.length === questions.length}
                    />
                  </TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Options</TableHead>
                  <TableHead>Correct Answer</TableHead>
                  <TableHead>Image</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className={`${tableBodyClassName}`}>
                {questions.map((question) => (
                  <TableRow key={question.id} className='cursor-pointer'>
                    <TableCell>
                      <input
                        type='checkbox'
                        className='form-checkbox'
                        checked={selectedQuestions.some(
                          (q) => q.id === question.id
                        )}
                        onChange={() => handleCheckboxChange(question)}
                      />
                    </TableCell>
                    <TableCell>{question.text}</TableCell>
                    <TableCell>
                      <ol className='list-decimal pl-5'>
                        {question.options.map((option, index) => (
                          <li key={index}>{option}</li>
                        ))}
                      </ol>
                    </TableCell>
                    <TableCell>
                      {question.options[question.correctAnswer]}
                    </TableCell>
                    <TableCell>
                      {question.image ? (
                        <Image
                          height={200}
                          width={300}
                          src={question.image}
                          alt='Question Image'
                        />
                      ) : (
                        'No Image'
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className='flex flex-col h-96 justify-center items-center'>
          <Loader />
          Loading Questions...
        </div>
      )}
    </>
  )
}

export default QuestionsTable
