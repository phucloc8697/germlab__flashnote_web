'use client'

import Spinner from '@/components/Spinner'
import { useAuthStore } from '@/store/useAuthStore'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

const LoginPage = () => {
  const router = useRouter()
  const { isAuth, login, verifyLogin } = useAuthStore(
    useShallow((state) => ({
      isAuth: state.isAuth,
      login: state.login,
      verifyLogin: state.verifyLogin,
    })),
  )
  const isPendingVerify = useAuthStore((state) => !!state.session)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const onLogin = async () => {
    try {
      setSubmitting(true)
      await login(email)
    } finally {
      setSubmitting(false)
    }
  }

  const onVerify = async () => {
    try {
      setSubmitting(true)
      await verifyLogin(code)
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
          <h1 className="text-2xl mb-5 text-center">
            {isPendingVerify ? 'Enter your code' : 'Login to Flashnote'}
          </h1>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-secondary">{isPendingVerify ? 'Code' : 'Email'}</label>
            <input
              className="border p-2"
              value={isPendingVerify ? code : email}
              onKeyUp={(e) => e.key === 'Enter' && onLogin()}
              onChange={(e) =>
                isPendingVerify ? setCode(e.target.value) : setEmail(e.target.value)
              }
            />
          </div>
          <button
            onClick={isPendingVerify ? onVerify : onLogin}
            disabled={submitting}
            className={classNames(
              'flex items-center justify-center gap-2',
              'bg-primary px-5 py-3 rounded font-medium text-sm',
            )}
          >
            {submitting ? <Spinner /> : <i className="bx bx-log-in text-xl" />}
            {isPendingVerify ? 'Verify' : 'Login'}
          </button>
          {isPendingVerify ? (
            <span
              className="text-accent text-sm hover:underline text-center"
              onClick={() => router.back()}
            >
              Use another email
            </span>
          ) : (
            <Link className="text-accent text-sm hover:underline text-center" href="/signup">
              Or you are new? Sign up here
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
