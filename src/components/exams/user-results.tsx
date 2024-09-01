'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import UserResultsChart from './user-results-chart'
import { getUserResults } from '@/actions/exams'

interface UserResult {
  id: string
  examTitle: string
  score: number
  totalQuestions: number
  timeSpent: number
  date: string
  examId: string
}

interface FetchResultsResponse {
  results: UserResult[]
  totalPages: number
  currentPage: number
}

const ITEMS_PER_PAGE = 10
const PASS_PERCENTAGE = 70

const UserResults: React.FC = () => {
  const router = useRouter()
  const [selectedExam, setSelectedExam] = useState<string | null>(null)
  const [results, setResults] = useState<UserResult[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchResults = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data: FetchResultsResponse = await getUserResults(
        currentPage,
        ITEMS_PER_PAGE
      )
      setResults(data.results)
      setTotalPages(data.totalPages)
    } catch (err) {
      setError('Failed to fetch results. Please try again.')
      console.error('Error fetching results:', err)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage])

  useEffect(() => {
    fetchResults()
  }, [fetchResults])

  const uniqueExams = useMemo(
    () => Array.from(new Set(results.map((result) => result.examId))),
    [results]
  )

  const filteredResults = useMemo(
    () =>
      selectedExam
        ? results.filter((result) => result.examId === selectedExam)
        : results,
    [selectedExam, results]
  )

  const handleExamSelect = useCallback((value: string) => {
    setSelectedExam(value === 'all' ? null : value)
  }, [])

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage)
  }, [])

  const handleViewDetails = useCallback(
    (resultId: string) => {
      router.push(`/exam-results/${resultId}`)
    },
    [router]
  )

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-red-500'>{error}</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='container mx-auto px-4 py-8 space-y-8'
    >
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-2xl font-bold'>
            Your Exam Results
          </CardTitle>
          <Select onValueChange={handleExamSelect}>
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Select an exam' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Exams</SelectItem>
              {uniqueExams.map((examId) => (
                <SelectItem key={examId} value={examId}>
                  {results.find((r) => r.examId === examId)?.examTitle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <UserResultsChart results={filteredResults} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='font-semibold'>Exam</TableHead>
                  <TableHead className='font-semibold'>Score</TableHead>
                  <TableHead className='font-semibold'>Time Spent</TableHead>
                  <TableHead className='font-semibold'>Date</TableHead>
                  <TableHead className='font-semibold'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode='wait'>
                  {isLoading ? (
                    <LoadingRow />
                  ) : (
                    filteredResults.map((result, index) => (
                      <ResultRow
                        key={result.id}
                        result={result}
                        index={index}
                        onViewDetails={handleViewDetails}
                      />
                    ))
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </motion.div>
  )
}

const LoadingRow: React.FC = () => (
  <TableRow>
    <TableCell colSpan={5} className='text-center py-4'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='flex justify-center items-center space-x-2'
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className='w-4 h-4 bg-blue-500 rounded-full animate-bounce'
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </motion.div>
    </TableCell>
  </TableRow>
)

interface ResultRowProps {
  result: UserResult
  index: number
  onViewDetails: (id: string) => void
}

const ResultRow: React.FC<ResultRowProps> = React.memo(
  ({ result, index, onViewDetails }) => (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
    >
      <TableCell className='font-medium'>{result.examTitle}</TableCell>
      <TableCell>
        <span
          className={`font-semibold ${
            (result.score / result.totalQuestions) * 100 >= PASS_PERCENTAGE
              ? 'text-green-600'
              : 'text-red-600'
          }`}
        >
          {result.score}/{result.totalQuestions}
        </span>
      </TableCell>
      <TableCell>
        {Math.floor(result.timeSpent / 60)}m {result.timeSpent % 60}s
      </TableCell>
      <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
      <TableCell>
        <Button size='sm' onClick={() => onViewDetails(result.examId)}>
          View Details
        </Button>
      </TableCell>
    </motion.tr>
  )
)

ResultRow.displayName = 'ResultRow'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className='flex justify-center items-center space-x-4 mt-4'>
    <Button
      onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      disabled={currentPage === 1}
      variant='outline'
    >
      <ChevronLeft className='h-4 w-4 mr-2' />
      Previous
    </Button>
    <span className='text-sm font-medium'>
      Page {currentPage} of {totalPages}
    </span>
    <Button
      onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      disabled={currentPage === totalPages}
      variant='outline'
    >
      Next
      <ChevronRight className='h-4 w-4 ml-2' />
    </Button>
  </div>
)

export default UserResults
