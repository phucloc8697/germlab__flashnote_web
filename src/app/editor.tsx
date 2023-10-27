'use client'

import { useNoteStore } from '@/store/useNoteStore'
import { Note } from '@/types'
import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react'

const Editor = () => {
  const { currentNote, createNote, updateNote } = useNoteStore()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const currentId = useRef<string>('')
  const timeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (currentNote && currentNote.id !== currentId.current) {
      setTitle(currentNote.title)
      setContent(currentNote.content)
      currentId.current = currentNote.id
    }
  }, [currentNote])

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    if (!text) return
    setTitle(text)
    clearTimeout(timeout.current)
    timeout.current = undefined
    if (currentNote) {
      timeout.current = setTimeout(() => {
        updateNote(currentNote.id, { title: text })
      }, 1000)
    } else {
      timeout.current = setTimeout(() => {
        createNote({ title: text, content: '' })
      }, 1000)
    }
  }

  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (!text) return
    setContent(text)
    clearTimeout(timeout.current)
    timeout.current = undefined
    if (currentNote) {
      timeout.current = setTimeout(() => {
        updateNote(currentNote.id, { content: text })
      }, 1000)
    } else {
      timeout.current = setTimeout(() => {
        const title = 'New note'
        createNote({ title, content: text })
      }, 1000)
    }
  }

  return (
    <div className="flex-1 flex flex-col px-5 py-10 gap-10">
      <input
        className="text-2xl font-medium bg-transparent outline-none px-5 py-2 hover:shadow-lg focus:shadow-none"
        placeholder="Title"
        value={title}
        onChange={onTitleChange}
      />
      <textarea
        className="flex-1 bg-transparent outline-none px-5 py-2 hover:shadow-lg focus:shadow-none"
        placeholder="Enter..."
        value={content}
        onChange={onContentChange}
      />
    </div>
  )
}

export default Editor
