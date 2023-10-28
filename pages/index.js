import Image from 'next/image'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })
const Canvas = dynamic(() => import('../components/draw'), { ssr: false })
import Sidebar from "../components/sidebar"
export default function Home() {
  return (
    <div className='bg-white h-screen overflow-hidden flex'>
<Sidebar/>
   <Canvas/>
    </div>
  )
}
