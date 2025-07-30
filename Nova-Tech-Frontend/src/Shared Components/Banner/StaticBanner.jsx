import React from 'react'
import Banner from "../../assets/files/banner/MBG.jpg"
import { useLocation, useNavigate } from 'react-router'
export const StaticBanner = ({ BannerImg, BannerText }) => {
  const location = useLocation()
  const navigate = useNavigate()
  return (

    <section className='bg-base-100'>
      <div className='w-full md:h-[650px] h-[550px]  rounded-lg overflow-hidden relative bg-fixed brightness-85 bg-cover bg-center flex items-center justify-center px-3 py-20  m-auto ' style={{ backgroundImage: `url(${Banner})` }}>

        {/* <img loading="lazy" src={BannerImg || Banner} className=' md:h-[350px] w-full object-cover rounded-md ' alt="" /> */}
        {
          location.pathname == '/' && (
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 text-center space-y-5'>
              <p className='font-bold text-gray-200 text-2xl md:text-7xl'>NOVA Audio Innovations</p>
              <p className=' text-gray-200 md:text-2xl font-semibold'>Highlighting the advanced audio solutions your <br /> company offers.</p>
              <button onClick={() => navigate('/profile')} className='md:px-10 px-5 py-2 md:py-5 bg-gray-200 text-blue-700   font-semibold rounded-lg cursor-pointer hover:scale-105 transition-all delay-150 duration-300'>View Details</button>
            </div>
          )
        }


      </div>
    </section>

  )
}
