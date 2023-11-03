import classNames from 'classnames'
import { useState, useEffect, ReactNode } from 'react'

interface ModalProps {
  open: boolean
  children: ReactNode
  onClose: () => void
}

const Modal = (props: ModalProps) => {
  const { open, children, onClose } = props
  const [inOpen, setInOpen] = useState(open)

  useEffect(() => {
    setTimeout(() => setInOpen(open), open ? 0 : 300)
  }, [open])

  if (!open && !inOpen) return null

  return (
    <div
      className={classNames(
        'fixed top-0 w-screen h-screen',
        'flex items-center justify-center',
        'opacity-0 transition duration-300',
        open && inOpen && 'opacity-100',
      )}
    >
      <div className="absolute w-full h-full bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded shadow-lg" style={{ minWidth: 300 }}>
        {children}
      </div>
    </div>
  )
}

export default Modal
