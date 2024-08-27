'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface ChartData {
  date: string
  score: number
  examTitle: string
  totalQuestions: number
}

interface UserResultsChartProps {
  results: ChartData[]
}

export default function UserResultsChart({ results }: UserResultsChartProps) {
  const chartData = results
    .map((result) => ({
      date: new Date(result.date).toLocaleDateString(),
      score: ((result.score ?? 0) / result.totalQuestions) * 100,
      examTitle: result.examTitle,
    }))
    .reverse() // Reverse the array to display oldest to newest

  return (
    <Card className='w-full mt-8'>
      <CardHeader>
        <CardTitle>Performance Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const value = payload[0]?.value as number | undefined
                    return (
                      <div className='bg-secondary p-4 rounded shadow'>
                        <p className='font-bold'>{label}</p>
                        <p>{payload[0].payload.examTitle}</p>
                        <p>
                          Score:{' '}
                          {value !== undefined ? `${value.toFixed(2)}%` : 'N/A'}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line type='monotone' dataKey='score' stroke='#8884d8' />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
