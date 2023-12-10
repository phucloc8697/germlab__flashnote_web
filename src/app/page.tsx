'use client'

import Editor from '@/components/Editor'
import EditorHeader from '@/components/EditorHeader'
import Sidebar from '@/components/Sidebar'
import styles from './styles.module.scss'
import classNames from 'classnames'
import { useNoteStore } from '@/store/useNoteStore'
import Spinner from '@/components/Spinner'
import { useAuthStore } from '@/store/useAuthStore'
import { redirect, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const pathname = usePathname()
  const saving = useNoteStore((state) => state.saving)
  const isAuth = useAuthStore((state) => state.isAuth)

  useEffect(() => {
    if (!isAuth() && pathname === '/') redirect('/login')
  }, [isAuth, pathname])

  return (
    <main className="min-h-screen flex">
      <Sidebar />
      <div className={classNames('flex-1 flex flex-col bg-main', styles.content)}>
        <EditorHeader />
        <div className={classNames('flex items-center justify-end px-4 py-2', styles.statusBar)}>
          {saving && (
            <div className="flex items-center gap-2 text-xs text-secondary font-medium">
              <Spinner className="h-3 w-3" />
              Saving
            </div>
          )}
        </div>
        <Editor />
        <div className="flex items-center justify-end px-4 py-2">
          <Link href="/privacy" className="text-sm text-secondary font-medium">
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  )
}
