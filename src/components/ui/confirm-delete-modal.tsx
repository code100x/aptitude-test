'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

type ConfirmDeleteModalProps = {
  open: boolean
  isDeleting: boolean
  customText?: string
  onClose: () => void
  examId: string
  handleDelete: () => void
}

export function ConfirmDeleteModal({
  open,
  onClose,
  customText,
  isDeleting,
  handleDelete,
}: ConfirmDeleteModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/30' />
        <Dialog.Content className='fixed top-[50%] left-[50%] w-[90vw] max-w-md max-h-[85vh] transform -translate-x-[50%] -translate-y-[50%] bg-white p-6 rounded-lg shadow-lg'>
          <Dialog.Title className='text-lg font-semibold'>
            Confirm Delete
          </Dialog.Title>
          <Dialog.Description className='mt-2 text-sm text-gray-500'>
            Are you sure you want to delete this {customText}? This action
            cannot be undone.
          </Dialog.Description>

          <div className='mt-6 flex justify-end gap-2'>
            <Button variant='secondary' onClick={onClose} disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={handleDelete}
              disabled={isDeleting}
              className='flex gap-2 items-center'
            >
              <Trash2 size={20}/>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
