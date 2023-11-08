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
import { useAuthStore } from '@/store/useAuthStore'
import MenuItem from './MenuItem'

const Sidebar = () => {
  const isAuth = useAuthStore((state) => state.isAuth)
  const logout = useAuthStore((state) => state.logout)
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
    if (isAuth()) getNotes()
  }, [isAuth, getNotes])

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
      onClick={toggleSidebar}
      className={classNames(
        'sidebar-container transition duration-300 opacity-0',
        !isOpenSidebar && 'pointer-events-none',
        isOpenSidebar && 'opacity-100',
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={classNames(
          'sidebar flex flex-col',
          'h-full bg-primary py-3 pointer-events-auto',
          ' transition duration-300',
          !isOpenSidebar && '-translate-x-full md:translate-x-0',
          isOpenSidebar && 'translate-x-0',
        )}
      >
        <div className="flex items-center gap-2 p-5">
          <Image width={25} height={25} alt="" src="logo.png" />
          <span className="text-black text-xl font-medium">Flashnote</span>
        </div>
        <div className="flex flex-1 flex-col p-2">
          {sidebarNotes.map((e) => {
            const active = currentNote && e.id === currentNote.id
            return (
              <MenuItem
                key={e.id}
                text={formatDate(e.created_at)}
                active={!!active}
                onClick={() => {
                  setCurrentNote(e)
                  toggleSidebar()
                }}
                onDelete={(event) => onDeleteNote(event, e)}
              />
            )
          })}
        </div>
        <div className="p-5">
          <MenuItem
            text={
              <div className="flex items-center gap-2">
                <i className="bx bx-log-out" />
                Logout
              </div>
            }
            onClick={() => logout()}
          />
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
