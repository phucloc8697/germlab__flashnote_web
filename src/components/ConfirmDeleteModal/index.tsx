import Modal from '@/components/Modal'
import classNames from 'classnames'

interface Props {
  open: boolean
  onConfirm: () => void
  onClose: () => void
}

const ConfirmDeleteModal = (props: Props) => {
  const { open, onConfirm, onClose } = props

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col p-5 gap-10">
        <p>Are you sure you want to delete?</p>
        <div className="flex items-center justify-end gap-2">
          <button
            className={classNames('bg-slate-200 rounded px-4 py-2', 'text-sm font-medium')}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={classNames('bg-red-500 rounded px-4 py-2', 'text-sm text-white font-medium')}
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDeleteModal
