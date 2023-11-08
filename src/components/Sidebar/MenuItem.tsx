import classNames from 'classnames'
import styles from './styles.module.scss'
import { ReactNode } from 'react'

interface MenuItemProps {
  text: string | ReactNode
  active?: boolean
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const MenuItem = (props: MenuItemProps) => {
  const { text, active, onClick, onDelete } = props

  return (
    <div
      className={classNames(
        styles.item,
        'flex items-center px-5 py-2 rounded transition duration-300',
        'hover:shadow-lg hover:bg-white cursor-pointer',
        active ? 'text-dark font-semibold' : 'text-secondary',
      )}
      onClick={onClick}
    >
      <span className="flex-1">{text}</span>
      {onDelete && (
        <button className={classNames(styles.deleteButton)} onClick={onDelete}>
          <i className={classNames(styles.icon, 'bx bx-trash transition duration-300')} />
        </button>
      )}
    </div>
  )
}

export default MenuItem
