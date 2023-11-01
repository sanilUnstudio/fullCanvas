import React,{useState, useRef, useEffect} from 'react'
import useOutsideClick from '@/hooks/useOutsideClick';
const Navbar = ({
    zoomValue,
    setZoomValue
}) => {
    let val = Math.floor(zoomValue * 100);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropRef = useRef();
     
     useOutsideClick(dropRef,()=>setShowDropdown(false))
    

    const handleDropdown = (e) => {
        let val = e
        console.log(val)
        if (val <= .1) {
            if (val == .05) {
                setZoomValue((prev) =>
                {
                    if (prev >= 1.5) return 1.5
                    return prev + val
                }
                )
            }
            else {
                setZoomValue((prev) => {
                    if(prev <= 0.25) return 0.25
                     return prev - 0.05
                })
            }
        } else {
            setZoomValue(val)
        }
    }
  return (
      <div
          className='min-h-[2rem] bg-[#18181a] text-white flex items-center justify-end px-4'
      >
          <p ref={dropRef} onClick={()=>setShowDropdown(!showDropdown)} className='cursor-pointer'> 
               {val+"%"}
          </p>
        {showDropdown &&  <div  className='absolute top-9 right-0 z-10 bg-[#18181a] p-4 rounded-lg'>
              <h1 className='cursor-pointer' onClick={(e)=>handleDropdown(.05)} value="5">Zoom In</h1>
              <h1 className='cursor-pointer' onClick={(e) => handleDropdown(.1)} value="10">Zoom Out</h1>
              <h1 className='cursor-pointer' onClick={(e) => handleDropdown(.50)} value="50">Zoom to 50%</h1>
              <h1 className='cursor-pointer' onClick={(e) => handleDropdown(1)} value="100">Zoom to 100%</h1>
          </div>}
      </div>
  )
}

export default Navbar