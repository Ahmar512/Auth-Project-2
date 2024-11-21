import React from 'react'

const Input = ({icon:Icon, ...props }) => {
  return (
    <div className='relative mb-5 rounded-lg overflow-hidden   '>
        <div className='absolute inset-y-0 left-0 flex items-center pl-2 bg-backg'>
            <Icon className="size-5 text-primary" />
        </div>
        <input {...props} required
            className='w-full pl-10 pr-3 py-2 bg-backg outline-none text-primary placeholder:text-primary'
        />
    </div>
  )
}

export default Input