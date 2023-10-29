import useWindowSize from '@/hooks/useWindowSize'
import { useNoteStore } from '@/store/useNoteStore'
import { useSidebarStore } from '@/store/useSidebarStore'
import { Note } from '@/types'
import { formatDate, isToday } from '@/utils/date'
import classNames from 'classnames'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

const Sidebar = () => {
  const { getNotes, setCurrentNote } = useNoteStore(useShallow((state) => state))
  const currentNote = useNoteStore((state) => state.currentNote)
  const { toggleSidebar } = useSidebarStore(useShallow((state) => state))
  const sidebarOpen = useSidebarStore((state) => state.open)
  const { isMobile } = useWindowSize()

  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    getNotes().then((res) => {
      setNotes(res)
    })
  }, [getNotes])

  useEffect(() => {
    if (!currentNote && notes.length > 0) {
      const note = notes.find((e) => isToday(e.created_at))
      if (note) setCurrentNote(note)
    }
  }, [notes, currentNote, setCurrentNote])

  const isOpenSidebar = useMemo(() => {
    return !isMobile() || sidebarOpen
  }, [isMobile, sidebarOpen])

  return (
    <div
      className={classNames(
        'sidebar-container transition duration-300 opacity-0',
        !isOpenSidebar && 'pointer-events-none',
        isOpenSidebar && 'opacity-100',
      )}
      onClick={() => isMobile() && toggleSidebar()}
    >
      <div
        className={classNames(
          'sidebar',
          'h-full bg-accent py-3 pointer-events-auto',
          ' transition duration-300',
          !isOpenSidebar && '-translate-x-full md:translate-x-0',
          isOpenSidebar && 'translate-x-0',
        )}
      >
        <div className="flex items-center gap-2 p-5">
          <Image width={25} height={25} alt="" src="logo.png" />
          <span className="text-black text-xl font-medium">Flashnote</span>
        </div>
        <div className="flex flex-col p-2">
          {notes.map((e) => {
            const active = currentNote && e.id === currentNote.id
            return (
              <div
                key={e.id}
                className={classNames(
                  'px-5 py-2 rounded transition duration-300',
                  'hover:shadow-lg hover:bg-white cursor-pointer',
                  active ? 'text-primary font-semibold' : 'text-secondary',
                )}
                onClick={() => setCurrentNote(e)}
              >
                {formatDate(e.created_at)}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
