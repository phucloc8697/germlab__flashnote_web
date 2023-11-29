'use client'

import Spinner from '@/components/Spinner'
import { useAuthStore } from '@/store/useAuthStore'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

const SignupPage = () => {
  const router = useRouter()
  const { isAuth, signUp } = useAuthStore(
    useShallow((state) => ({
      signUp: state.signUp,
      isAuth: state.isAuth,
    })),
  )
  const isPendingVerify = useAuthStore((state) => !!state.session)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async () => {
    try {
      setSubmitting(true)
      await signUp(email)
    } finally {
      setSubmitting(false)
    }
  }

  if (isAuth()) router.replace('/')

  return (
    <div className="container w-screen h-screen flex items-center justify-center">
      <div
        className={classNames('bg-white shadow-sm rounded-xl overflow-hidden')}
        style={{ width: 400 }}
      >
        <div className="w-full bg-primary" style={{ height: 60 }} />
        <div className="flex flex-col px-10 py-5 gap-5">
          <h1 className="text-2xl mb-5 text-center">{'Sign Up to Flashnote'}</h1>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-secondary">Email</label>
            <input
              className="border p-2"
              value={isPendingVerify ? code : email}
              onKeyUp={(e) => e.key === 'Enter' && onSubmit()}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={onSubmit}
            disabled={submitting}
            className={classNames(
              'flex items-center justify-center gap-2',
              'bg-primary px-5 py-3 rounded font-medium text-sm',
            )}
          >
            {submitting ? <Spinner /> : <i className="bx bx-user-plus text-xl" />}
            Create Account
          </button>
          <Link className="text-accent text-sm hover:underline text-center" href="/login">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
