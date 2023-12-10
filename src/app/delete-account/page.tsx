'use client'

import Spinner from '@/components/Spinner'
import { useAuthStore } from '@/store/useAuthStore'
import classNames from 'classnames'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

const DeleteAccountPage = () => {
  const { deleteAccount } = useAuthStore(
    useShallow((state) => ({
      deleteAccount: state.deleteAccount,
    })),
  )
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async () => {
    try {
      setSubmitting(true)
      await deleteAccount(email)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container w-screen h-screen flex items-center justify-center mx-auto">
      <div
        className={classNames('bg-white shadow-sm rounded-xl overflow-hidden')}
        style={{ width: 400 }}
      >
        <div className="w-full bg-primary" style={{ height: 60 }} />
        <div className="flex flex-col px-10 py-5 gap-5">
          <h1 className="text-2xl mb-4 text-center">Request to Delete</h1>
          <p className="text-sm">
            We will delete all the data belongs to your account and{' '}
            <strong className="text-red-500">this deletion can not be undone</strong>.
          </p>
          <p className="text-sm">
            After submit your request, it’ll take up to 3 working days to proceed.
          </p>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-secondary">Email</label>
            <input
              className="border p-2"
              value={email}
              onKeyUp={(e) => e.key === 'Enter' && onSubmit()}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={onSubmit}
            disabled={submitting}
            className={classNames(
              'flex items-center justify-center gap-2',
              'bg-red-500 px-5 py-3 rounded font-medium text-sm text-white',
            )}
          >
            {submitting ? <Spinner /> : <i className="bx bx-user-minus text-xl" />}
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccountPage
