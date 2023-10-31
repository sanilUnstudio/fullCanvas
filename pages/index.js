import Image from 'next/image'
import { useState } from 'react'
import dynamic from 'next/dynamic'
const Canvas = dynamic(() => import('../components/draw'), { ssr: false })
import Sidebar from "../components/sidebar"
export default function Home() {
  const data = [
    "https://ik.imagekit.io/ei5bqbiry/unstudio_pictures_aseemkhanduja_gmail.com_image-1607_Y0XCEW8gCO.jpg?updatedAt=1698674245770",
    "https://ik.imagekit.io/ei5bqbiry/default%20products/shashank_unstudio.ai_1694772569_8644261116_QDqDEEfXk.png?updatedAt=1695098791412",
    "https://ik.imagekit.io/ei5bqbiry/assets/storageblogsoumya_gmail.com_1698592902_8095382256_pSbfIKjlX.png?updatedAt=1698592906104",
    "https://ik.imagekit.io/ei5bqbiry/assets/sanil_unstudio.ai_335.480183549549_syM85ffeR.png?updatedAt=1698262039520",
  ]
  const [file, setFile] = useState([...data]);
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
