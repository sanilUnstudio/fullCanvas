import Image from 'next/image'
import { useState } from 'react'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })
const Canvas = dynamic(() => import('../components/draw'), { ssr: false })
import Sidebar from "../components/sidebar"
export default function Home() {
  const [file, setFile] = useState([]);
  const [target, setTarget] = useState();
  const [productVisible, setProductVisible] = useState(false);

  return (
    <div className='bg-white h-screen  flex'>
      <Sidebar
        file={file}
        setFile={setFile}
        setTarget={setTarget}
        productVisible={productVisible}
        setProductVisible={setProductVisible}
      />
   <Canvas target={target}  setProductVisible={setProductVisible} />
    </div>
  )
}
