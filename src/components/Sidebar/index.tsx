import classNames from 'classnames'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useWindowSize from '@/hooks/useWindowSize'
import { useNoteStore } from '@/store/useNoteStore'
import { useSidebarStore } from '@/store/useSidebarStore'
import { formatDate, isToday } from '@/utils/date'
import { Note } from '@/types'
import styles from './styles.module.scss'
import ConfirmDeleteModal from '../ConfirmDeleteModal'

const Sidebar = () => {
  const { getNotes, setCurrentNote, deleteNote } = useNoteStore(
    useShallow((state) => ({
      getNotes: state.getNotes,
      setCurrentNote: state.setCurrentNote,
      deleteNote: state.deleteNote,
    })),
  )
  const { currentNote, sidebarNotes } = useNoteStore(
    useShallow((state) => ({ currentNote: state.currentNote, sidebarNotes: state.sidebarNotes })),
  )
  const { toggleSidebar, sidebarOpen } = useSidebarStore(
    useShallow((state) => ({ toggleSidebar: state.toggleSidebar, sidebarOpen: state.open })),
  )
  const { isMobile } = useWindowSize()

  const [confirmModal, setConfirmModal] = useState({
    open: false,
    data: undefined as Note | undefined,
  })

  useEffect(() => {
    getNotes()
  }, [getNotes])

  useEffect(() => {
    if (!currentNote && sidebarNotes.length > 0) {
      const note = sidebarNotes.find((e) => isToday(e.created_at))
      if (note) setCurrentNote(note)
    }
  }, [sidebarNotes, currentNote, setCurrentNote])

  const isOpenSidebar = useMemo(() => {
    return !isMobile() || sidebarOpen
  }, [isMobile, sidebarOpen])

  const onDeleteNote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: Note) => {
    e.stopPropagation()
    setConfirmModal({ open: true, data: item })
  }

  const handleDeleteNote = (item: Note | undefined) => {
    if (item) deleteNote(item.id)
  }

  return (
    <div
      className={classNames(
        'sidebar-container transition duration-300 opacity-0',
        !isOpenSidebar && 'pointer-events-none',
        isOpenSidebar && 'opacity-100',
      )}
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
          {sidebarNotes.map((e) => {
            const active = currentNote && e.id === currentNote.id
            return (
              <div
                key={e.id}
                className={classNames(
                  styles.item,
                  'flex items-center px-5 py-2 rounded transition duration-300',
                  'hover:shadow-lg hover:bg-white cursor-pointer',
                  active ? 'text-primary font-semibold' : 'text-secondary',
                )}
                onClick={() => {
                  setCurrentNote(e)
                  toggleSidebar()
                }}
              >
                <span className="flex-1">{formatDate(e.created_at)}</span>
                <button
                  className={classNames(styles.deleteButton)}
                  onClick={(event) => onDeleteNote(event, e)}
                >
                  <i className={classNames(styles.icon, 'bx bx-trash transition duration-300')} />
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <ConfirmDeleteModal
        open={confirmModal.open}
        onConfirm={() => handleDeleteNote(confirmModal.data)}
        onClose={() => setConfirmModal({ open: false, data: undefined })}
      />
    </div>
  )
}

export default Sidebar
