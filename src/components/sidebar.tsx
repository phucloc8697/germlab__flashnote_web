'use client'

import { useNoteStore } from '@/store/useNoteStore'
import { Note } from '@/types'
import { formatDate, isToday } from '@/utils/date'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Sidebar = () => {
  const { currentNote, getNotes, setCurrentNote } = useNoteStore()
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    getNotes().then((res) => {
      setNotes(res)
    })
  }, [getNotes])

  useEffect(() => {
    if (!currentNote && notes.length > 0 && isToday(notes[0].created_at)) {
      setCurrentNote(notes[0])
    }
  }, [notes, currentNote, setCurrentNote])

  return (
    <div className="sidebar bg-accent px-4 py-3">
      <div className="flex items-center gap-2 py-5">
        <Image width={25} height={25} alt="" src="logo.png" />
        <span className="text-black text-xl font-medium">Flashnote</span>
      </div>
      <div className="flex flex-col">
        {notes.map((e) => {
          return <div key={e.id}>{formatDate(e.created_at)}</div>
        })}
      </div>
    </div>
  )
}

export default Sidebar
