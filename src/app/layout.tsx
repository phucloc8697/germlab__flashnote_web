import type { Metadata } from 'next'
import { fontCaros } from '@/fonts'
import classNames from 'classnames'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  title: 'Flashnote',
  description: 'Flashnote by germlab.dev',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#f6f6af" />
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </head>
      <body className={classNames(fontCaros.variable, 'font-sans text-dark bg-gray-200')}>
        {children}
      </body>
      <ToastContainer />
    </html>
  )
}
