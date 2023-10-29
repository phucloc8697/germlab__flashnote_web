import { useNoteStore } from '@/store/useNoteStore'
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  LegacyRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'
import { useShallow } from 'zustand/react/shallow'

const DEBOUNCE_TIMEOUT = 3000

const Editor = () => {
  const currentNote = useNoteStore((state) => state.currentNote)
  const { getNotes, createNote, updateNote } = useNoteStore(useShallow((state) => state))

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

  useEffect(() => {
    const elTitle = document.getElementById('title-textarea')
    const elContent = document.getElementById('content-textarea')
    if (elTitle) {
      elTitle.style.height = '0px'
      elTitle.style.height = elTitle.scrollHeight + 'px'
    }
    if (elContent) {
      elContent.style.height = '0px'
      elContent.style.height = elContent.scrollHeight + 'px'
    }
  }, [title, content])

  const syncNote = (title: string, content: string) => {
    if (currentNote) {
      timeout.current = setTimeout(() => {
        updateNote(currentNote.id, { title, content })
      }, DEBOUNCE_TIMEOUT)
    } else {
      timeout.current = setTimeout(async () => {
        await createNote({ title, content })
        getNotes()
      }, DEBOUNCE_TIMEOUT)
    }
  }

  const onTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    e.target.style.height = '0px'
    e.target.style.height = e.target.scrollHeight + 'px'

    setTitle(text)
    clearTimeout(timeout.current)
    timeout.current = undefined
    syncNote(text, content)
  }

  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    e.target.style.height = '0px'
    e.target.style.height = e.target.scrollHeight + 'px'

    setContent(text)
    clearTimeout(timeout.current)
    timeout.current = undefined
    syncNote(title, text)
  }

  return (
    <div className={classNames('flex-1 flex flex-col px-5', styles.editor)}>
      <textarea
        id="title-textarea"
        className={classNames(
          'text-2xl font-medium bg-transparent outline-none p-5 resize-none',
          'hover:shadow-lg focus:shadow-none',
        )}
        placeholder="Title"
        value={title}
        onChange={onTitleChange}
      />
      <textarea
        id="content-textarea"
        className={classNames(
          'bg-transparent outline-none p-5 overflow-y-hidden resize-none',
          'hover:shadow-lg focus:shadow-none',
        )}
        placeholder="Enter..."
        onChange={onContentChange}
      />
    </div>
  )
}

export default Editor
