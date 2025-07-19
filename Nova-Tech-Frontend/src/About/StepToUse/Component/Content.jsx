import React from 'react'

export const Content = ({img,content}) => {
    return (
        <div className="flex items-center flex-col max-sm:flex-col min-h-[600px] space-y-5 max-sm:space-y-3 p-3">

            <div className='rounded-md overflow-hidden w-full'>
                <img loading="lazy" className=" hover:scale-105 duration-150 transition-all ease-in-out cursor-pointer h-[400px] w-full " src={img} alt="" />
            </div>
            {
                content
            }
           
        </div>
    )
}
