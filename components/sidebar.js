import React,{useEffect, useRef, useState} from 'react'
import { Switch } from '@chakra-ui/react'
const Sidebar = ({ file, setFile, setTarget, productVisible, setProductVisible, setSketch, sketch, eraser, setEraser }) => {

    const [sketchOpen, setSketchOpen] = useState(false);

    const divRef = useRef();

    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setSketchOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        
    }, [])
    return (
        <div ref={divRef} className='flex flex-col text-white gap-4 py-8 min-w-[5rem] bg-[#18181a] items-center'>
          <p className=' cursor-pointer' onClick={()=> setProductVisible(!productVisible)} >product</p>
          <p className=' cursor-pointer'>props</p>
          <p className=' cursor-pointer' onClick={()=> setSketchOpen(!sketchOpen)} >Sketch</p>

         {productVisible && <div className='absolute left-20 z-10 top-0 bg-[#18181a] border-l h-screen max-w-[20rem]'>
              <input type='file' className='text-center' multiple onChange={(e) => setFile((prev) => {
                  if (e.target.files.length == 1) {
                      return [...prev, URL.createObjectURL(e.target.files[0])]
                  } else {
                      let rm = [];
                      for (let i = 0; i < e.target.files.length; i++) {
                          rm.push(URL.createObjectURL(e.target.files[i]))
                      }
                      return [...prev, ...rm]
                  }
              })} />
              <div className='flex gap-2 justify-between px-2 flex-wrap'>
                  {file.length > 0 && file.map((db) => (
                      <div className='h-36 w-36' onClick={()=>setTarget(db)}>
                          <img
                              alt="lion"
                              className='h-full w-[100%]'
                              src={db}
                          />
                      </div>
                  ))}
              </div>
            </div>}
            
            {sketchOpen && <div className='absolute left-20 z-10 top-0 bg-[#18181a] border-l h-screen min-w-[8rem] max-w-[20rem]'>
                <div className='flex gap-4 justify-center py-4'>
                    <div>
                    <p>Pencil</p>
                    <Switch size='md' isChecked={sketch} onChange={()=>{setSketch(!sketch),setEraser(false)}} />
                    </div>
                    <div>
                    <p>Eraser</p>
                    <Switch size='md' isChecked={eraser} onChange={()=>{setEraser(!eraser),setSketch(false)}} />
                    </div>
                </div>
            </div>}
   </div>
  )
}

export default Sidebar