import React from 'react'

const Sidebar = () => {
  return (
      <div className='flex flex-col gap-4 py-8 relative'>
          <p className='text-black cursor-pointer'>product</p>
          <p className='text-black cursor-pointer'>props</p>
          <p className='text-black cursor-pointer'>Miracle</p>
          <div className='absolute -right-10 top-0 bg-gray-500 h-screen'>
              <p className='text-black'>sdhjvcjhsdfvhjs</p>
          </div>
   </div>
  )
}

export default Sidebar