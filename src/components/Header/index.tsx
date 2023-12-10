'use client'

import { useAuthStore } from '@/store/useAuthStore'
import { useSidebarStore } from '@/store/useSidebarStore'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

const Header = () => {
  const toggleSidebar = useSidebarStore(useShallow((state) => state.toggleSidebar))
  const email = useAuthStore((state) => state.email)

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
    <header id="header" className="w-full bg-primary shadow-sm md:shadow-none">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <button className="md:hidden rounded p-2 text-3xl" onClick={toggleSidebar}>
            <i className="bx bx-menu" />
          </button>
          <Link className="flex items-center gap-2 p-5" href="/">
            <Image width={25} height={25} alt="" src="logo.png" />
            <span className="text-black text-xl font-medium">Flashnote</span>
          </Link>
        </div>
        <div className="flex items-center justify-end text-sm">
          {email && (
            <span>
              Logged in as <strong className="text-accent">{email}</strong>
            </span>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
