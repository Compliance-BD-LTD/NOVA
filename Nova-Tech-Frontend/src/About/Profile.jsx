import React, { useEffect } from 'react'
import { StaticBanner } from '../Shared Components/Banner/StaticBanner'
import AboutBanner from '../assets/files/banner/abt_v2.png'
import NovaBuilding from '../assets/files/banner/NOVA Building.jpg'
import { Hero } from './Hero'
import { StepToUse } from './StepToUse/StepToUse'
export const Profile = () => {

    const Writing = (
        <div className='md:w-1/2 max-sm:text-center'>
            <p className='font-bold md:text-5xl text-3xl text-gray-800 '>WE ARE INNOVATIVE LEADERS</p><br />
            <p className='font-semibold text-gray-600'>We are more than just a technology company. We bring innovation and engineering excellence to life through premium audio systems and advanced technology products. </p>
                <br />
                <p>Our mission is to deliver superior sound quality and unmatched design, transforming technology into extraordinary experiences. We stand for innovation, reliability, and progress, shaping the future with every product we create.</p>
        </div>
    )

    const Image = (
        <div>
            <img loading="lazy" src={NovaBuilding} className='rounded-md' alt="" />
        </div>
    )

    useEffect(()=>{
        window.scrollTo(0,0)
    },[] )
    return (
        <div>

            <div className=' bg-gray-300'>
                <StaticBanner BannerImg={AboutBanner} ></StaticBanner>
            </div>



            <div className=' bg-gray-300'>
                <div className='max-w-[1340px] mx-auto py-10'>
                    <Hero Component1={Writing} Component2={Image} ></Hero>
                </div>
            </div>

            <div className='max-w-[1340px] mx-auto px-5 my-10'>
                <StepToUse></StepToUse>
            </div>


        </div>
    )
}
