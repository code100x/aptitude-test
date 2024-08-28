'use client'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  ArrowLeftIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Reply,
} from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Input } from '../ui/input'
import {
  addExamComment,
  addRepylToCommet,
  getExamComments,
} from '@/actions/exams'
import { toast } from 'sonner'
import Image from 'next/image'

const Examdetail = ({ exam, examId }: { exam: any; examId: string }) => {
  const [comments, setComments] = useState<any[]>([])
  const [seleComment, setSeleComment] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [addLoading, setAddLoding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [text, setText] = useState('')
  const [reply, setReply] = useState('')
  const [refetch, setRefetch] = useState(false)
  const fetchResults = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data: any = await getExamComments(examId, currentPage, 5)
      setComments(data.comments)
      setTotalPages(data.totalPages)
    } catch (err) {
      setError('Failed to fetch results. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [currentPage])
  useEffect(() => {
    fetchResults()
  }, [fetchResults, refetch])
  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-red-500'>{error}</p>
      </div>
    )
  }
  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage)
  }, [])
  const addComment = async () => {
    let content = text.trim()
    if (content.length == 0) {
      toast.error("Enter valid comment can't be an empty field")
      return
    }
    try {
      await addExamComment(examId, content)
      toast.success('added successfully:)')
      setText('')
      setRefetch(!refetch)
    } catch (err) {
      toast.error('Somehting went wrong while adding comment:(')
    }
  }
  return (
    <div className='container mx-auto px-4 py-8 space-y-8'>
      <Card className='h-full  flex flex-col border border-secondary md:w-[650px]'>
        <CardHeader>
          <CardTitle className='text-xl mb-2'>{exam.title}</CardTitle>
          <CardDescription>{exam.description}</CardDescription>
        </CardHeader>
        <CardContent className='flex-grow'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center mb-4 text-muted-foreground'>
              <Clock className='mr-2 h-4 w-4' />
              <span>{exam.duration} minutes</span>
            </div>
            <div className='flex items-center mb-4 text-muted-foreground'>
              <Clock className='mr-2 h-4 w-4' />
              <span>{exam.questions.length} total questions</span>
            </div>
          </div>
          <div className='flex items-center text-foreground font-semibold'>
            <CreditCard className='mr-2 h-4 w-4' />
            <span>INR {exam.price}</span>
          </div>
        </CardContent>
        <CardFooter className='flex items-center justify-end w-full'>
          <Button asChild className=''>
            <Link href={`/take/${exam.id}`}>Start Test</Link>
          </Button>
        </CardFooter>
      </Card>
      {!seleComment ? (
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-3 w-full'>
            <h1 className='text-foreground font-semibold'>Comments</h1>
            <div className='flex items-center gap-2'>
              <Input
                className='flex-1'
                placeholder='your review:)'
                onChange={(e) => {
                  setText(e.target.value)
                }}
                value={text}
              />
              <Button
                disabled={addLoading}
                onClick={(e) => {
                  e.preventDefault()
                  addComment()
                }}
              >
                Comment
              </Button>
            </div>
          </div>
          <div>
            {isLoading ? (
              <div className='h-[30dvh] text-center justify-center flex text-semibold'>
                <p>Loading...</p>
              </div>
            ) : (
              <div className=''>
                {comments.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className='py-2 px-4 rounded-xl border flex flex-col gap-4'
                    >
                      <div>
                        <div className='flex items-center gap-4'>
                          <Image
                            src={ele.user?.imageUrl || ''}
                            alt='default'
                            width={50}
                            height={50}
                            className='rounded-full border'
                          />
                          <div className='flex flex-col  gap-2'>
                            <p className='font-semibold'>{ele.user.username}</p>
                            <span className='text-sm text-gray-600'>
                              {ele.user.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className=' font-semibold'>{ele.content}</p>
                      <div className='flex items-center justify-between'>
                        <div
                          className='flex items-center gap-2 text-gray-600 text-[15px] cursor-pointer'
                          onClick={() => {
                            setSeleComment(ele)
                          }}
                        >
                          <Reply />
                          {ele.children.length}
                          <p>Reply</p>
                        </div>
                        <p className='text-sm text-gray-600'>
                          {new Date(ele.postedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      ) : (
        <div className='max-h-[64dvh] overflow-y-scroll'>
          <div className='flex flex-col gap-3 w-full'>
            <div
              className='flex items-center gap-3 cursor-pointer'
              onClick={() => {
                setSeleComment(null)
              }}
            >
              <ArrowLeftIcon />
              <p>Go Back</p>
            </div>
            <h1 className='text-foreground'>
              Comment:{' '}
              <span className='font-semibold'>{seleComment.content}</span>
            </h1>
            <div className='flex items-center gap-2'>
              <Input
                className='flex-1'
                placeholder='your rely:)'
                onChange={(e) => {
                  setReply(e.target.value)
                }}
                value={reply}
              />
              <Button
                disabled={addLoading}
                onClick={async (e) => {
                  e.preventDefault()
                  setAddLoding(true)
                  let rep = reply.trim()
                  if (rep.length == 0) {
                    toast.error('reply filed is not valid :(')
                    return
                  }
                  try {
                    const data: any = await addRepylToCommet(
                      examId,
                      seleComment.id,
                      rep
                    )
                    setReply('')
                    setRefetch(!refetch)

                    setSeleComment((prev: any) => {
                      prev?.children.push({
                        content: rep,
                        postedAt: Date.now(),
                        user: {
                          imageUrl: exam.me.imageUrl,
                          username: exam.me.username,
                          email: exam.me.email,
                        },
                      })
                      return prev
                    })
                    setAddLoding(false)
                    toast.success('Added successfully:)')
                  } catch (err) {
                    toast.error(
                      'something went wrong while posting your reply:('
                    )
                    setAddLoding(false)
                  }
                }}
              >
                Reply
              </Button>
            </div>
            <div>
              {seleComment.children.map((ee: any, ind: any) => {
                return (
                  <div
                    key={ind}
                    className='py-2 px-4 rounded-xl border flex flex-col gap-4'
                  >
                    <div>
                      <div className='flex items-center gap-4'>
                        <Image
                          src={ee.user?.imageUr || ''}
                          alt='default'
                          width={50}
                          height={50}
                          className='rounded-full border'
                        />
                        <div className='flex flex-col  gap-2'>
                          <p className='font-semibold'>{ee.user.username}</p>
                          <span className='text-sm text-gray-600'>
                            {ee.user.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className=' font-semibold'>{ee.content}</p>
                    <div className='flex items-center justify-end'>
                      <p className='text-sm text-gray-600'>
                        {new Date(ee.postedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

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
      disabled={currentPage === totalPages || totalPages == 0}
      variant='outline'
    >
      Next
      <ChevronRight className='h-4 w-4 ml-2' />
    </Button>
  </div>
)

export default Examdetail
