import React from 'react'

export const Content = ({item}) => {
  return (
    <div className=' text-neutral-900 text-center space-y-2 font-semibold'>


        <p className='text-2xl '>{item?.title}</p>
        <p className='font-normal' >{item?.description} <br /> any environment, creating an exceptional audio experience in every room.</p>

    </div>
  )
}
