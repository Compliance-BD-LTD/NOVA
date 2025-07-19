import React from 'react'
import { StaticBanner } from '../Shared Components/Banner/StaticBanner'
import ContactImg from "../assets/files/banner/bb.jpg"
import { ContactSection } from './ContactSection'
export const Contact = () => {
    return (
        <div>


            <StaticBanner BannerImg={ContactImg} ></StaticBanner>

            <div className='max-w-[1340px] mx-auto px-3'>
                <ContactSection></ContactSection>
            </div>




        </div>
    )
}
