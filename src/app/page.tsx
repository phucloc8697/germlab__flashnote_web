'use client'

import Editor from '@/components/Editor'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import styles from './styles.module.scss'
import classNames from 'classnames'
import { useNoteStore } from '@/store/useNoteStore'
import Spinner from '@/components/Spinner'

export default function Home() {
  const saving = useNoteStore((state) => state.saving)

  return (
    <main className="min-h-screen flex">
      <Sidebar />
      <div className={classNames('flex-1 flex flex-col bg-main', styles.content)}>
        <Header />
        <div className={classNames('flex items-center justify-end px-4 py-2', styles.statusBar)}>
          {saving && (
            <div className="flex items-center gap-2 text-xs text-secondary font-medium">
              <Spinner className="h-3 w-3" />
              Saving
            </div>
          )}
        </div>
        <Editor />
      </div>
    </main>
  )
}
