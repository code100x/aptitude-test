import React from 'react'
import { cn } from '@/lib/utils'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large' | 'extra-large'
  className?: string
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', className = '' }) => {
  // Define the size classes for the outer circle and spinning element
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-4',
    large: 'w-14 h-14 border-4',
    'extra-large': 'w-20 h-20 border-8',
  }

  // Define size classes for the inner circle
  const innerSizeClasses = {
    small: 'w-3 h-3',
    medium: 'w-5 h-5',
    large: 'w-8 h-8',
    'extra-large': 'w-12 h-12',
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full border-primary border-2', 
        sizeClasses[size], 
        className
      )}
    >
      <div
        className={cn(
          'absolute border-t-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin',
          sizeClasses[size]
        )}
      />
    </div>
  )
}

export default Loader
