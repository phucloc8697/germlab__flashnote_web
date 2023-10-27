import Sidebar from '@/components/sidebar'
import Editor from './editor'

export default function Home() {
  return (
    <main className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-main">
        <Editor />
      </div>
    </main>
  )
}
