import React from 'react'
import { Loader } from 'lucide-react'

const LoaderSpinner = () => {
  return (
    <div className='max-w-screen h-[100vh] bg-[#F6D6D6] flex justify-center items-center'>
        <div>
        <Loader className='animate-spin text-secondry' size={40} />
        </div>
    </div>
  )
}

export default LoaderSpinner