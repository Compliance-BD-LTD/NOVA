import React, { useState } from 'react'
import { StaticBanner } from '../Shared Components/Banner/StaticBanner'
import BannerImage from "../assets/files/banner/support5.jpg"
import supportImage from "../assets/files/icon/technical-support.png"
import maintenaceImage from "../assets/files/icon/maintenace.png"
import salesImage from "../assets/files/icon/sale.png"
import { SupportModal } from './SupportModal'
export const Support = () => {

    const [support, setSupport] = useState(null)
    const handleModal = (v) => {
        setSupport(v)
        document.getElementById('supportModal').checked = true

    }
    return (
        <div className='max-w-[1340px] mx-auto space-y-10 min-h-screen'>

            <StaticBanner BannerImg={BannerImage} BannerText={'Nova Officail Support '}  ></StaticBanner>

            <br />
            <br />

            <div className='text-center'>
                <p className='font-bold md:text-5xl text-3xl text-emerald-950'>Nova Support</p>
            </div>
            <div className='flex md:justify-around my-20 max-sm:flex-col max-sm:items-center max-sm:space-y-5'>
                <div className='rounded-lg  hover:scale-102 duration-150 transition-all ease-in-out  w-[300px] px-10 py-5 shadow-2xl shadow-blue-300 cursor-pointer  flex  items-center flex-col bg-blue-50' onClick={() => handleModal('Techinal Assitance')} >
                    <img loading="lazy" src={supportImage} className='w-[100px]' alt="" />
                    <p className='text-xl font-semibold text-blue-700'>Technical Assistance</p>
                </div>
                <div className='rounded-lg hover:scale-102 duration-150 transition-all ease-in-out w-[300px] px-10 py-5 shadow-2xl shadow-blue-300 cursor-pointer flex  items-center flex-col bg-blue-50' onClick={() => handleModal('Repair & Maintenance')}>
                    <img loading="lazy" src={maintenaceImage} className='w-[100px]' alt="" />
                    <p className='text-xl font-semibold text-blue-700'>Repair & Maintenance</p>
                </div>
                <div className='rounded-lg hover:scale-102 duration-150 transition-all ease-in-out w-[300px] px-10 py-5 shadow-2xl cursor-pointer shadow-blue-300  flex  items-center flex-col bg-blue-50' onClick={() => handleModal('Sales & Billing Support')}>
                    <img loading="lazy" src={salesImage} className='w-[100px]' alt="" />
                    <p className='text-xl font-semibold text-blue-700'>Sales & Billing Support</p>
                </div>
            </div>


            <SupportModal supportTitle={support}></SupportModal>


        </div>
    )
}
