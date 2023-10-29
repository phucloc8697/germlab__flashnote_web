import { useSidebarStore } from '@/store/useSidebarStore'
import React, { useEffect, useRef, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

const Header = () => {
  const toggleSidebar = useSidebarStore(useShallow((state) => state.toggleSidebar))

  const prevScrollPos = useRef(0)

  const handleScroll = () => {
    const currentScrollPos = window.scrollY
    const header = document.getElementById('header')
    if (!header) return
    if (currentScrollPos > prevScrollPos.current) {
      header.classList.add('hide')
    } else {
      header.classList.remove('hide')
    }
    if (currentScrollPos === 0) {
      header.classList.add('atTop')
    } else {
      header.classList.remove('atTop')
    }
    prevScrollPos.current = currentScrollPos
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header id="header" className="flex items-center justify-between shadow-sm md:shadow-none px-4">
      <div>
        <button className="md:hidden rounded p-2 text-xl" onClick={toggleSidebar}>
          <i className="bx bx-menu" />
        </button>
      </div>
      <div className="flex items-center justify-end" />
    </header>
  )
}

export default Header
