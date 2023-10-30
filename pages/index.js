import Image from 'next/image'
import { useState } from 'react'
import dynamic from 'next/dynamic'
const Canvas = dynamic(() => import('../components/draw'), { ssr: false })
import Sidebar from "../components/sidebar"
export default function Home() {
  const [file, setFile] = useState([]);
  const [target, setTarget] = useState();
  const [productVisible, setProductVisible] = useState(false);
  const [sketch, setSketch] = useState(false);
  const [eraser, setEraser] = useState(false);
  const [lineColor, setLineColor] = useState('#ff0000');
  const [lineWidth, setLineWidth] = useState(4);
  const [eraserWidth, setEraserWidth] = useState(4);

  return (
    <div className='bg-white h-screen  flex'>
      <Sidebar
        file={file}
        setFile={setFile}
        setTarget={setTarget}
        productVisible={productVisible}
        setProductVisible={setProductVisible}
        setSketch={setSketch}
        sketch={sketch}
        eraser={eraser}
        setEraser={setEraser}
        lineColor={lineColor}
        setLineColor={setLineColor}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        eraserWidth={eraserWidth}
        setEraserWidth={setEraserWidth}
      />
      <Canvas
        target={target}
        sketch={sketch}
        eraser={eraser}
        setProductVisible={setProductVisible}
        lineWidth={lineWidth}
        lineColor={lineColor}
        eraserWidth={eraserWidth}
      />
    </div>
  )
}
