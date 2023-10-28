import React from 'react'

const Sidebar = ({file, setFile, setTarget, productVisible, setProductVisible}) => {
    
console.log(file)
  return (
      <div className='flex flex-col gap-4 py-8 min-w-[5rem] bg-[#18181a] items-center'>
          <p className=' cursor-pointer' onClick={()=> setProductVisible(!productVisible)} >product</p>
          <p className=' cursor-pointer'>props</p>
          <p className=' cursor-pointer'>Miracle</p>

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
   </div>
  )
}

export default Sidebar