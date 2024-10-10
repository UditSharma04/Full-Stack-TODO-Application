import React from 'react'

const FlexBox = () => {
  return (
    <div className=' bg-gray-200 w-screen h-screen flex gap-4 justify-center items-center'>
        <div className=' flex flex-col gap-4 justify-center w-screen items-center h-full'>
            <div className=' bg-orange-500 w-14 h-14'></div>
            <div className=' bg-pink-500  w-14 h-14'></div>
            <div className=' bg-green-500  w-14 h-14'></div>
            <div className=' bg-blue-500  w-14 h-14'></div>
        </div>
    </div>
  )
}

export default FlexBox