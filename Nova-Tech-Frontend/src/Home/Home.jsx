import React, { useEffect } from 'react'
import { VideoBanner } from './Component/HeroSection/VideoBanner'
import { Content } from './Component/HeroSection/Content/Content'
import { SliderContent } from './Component/HeroSection/SliderContent/SliderContent'
import { Categories } from './Component/HeroSection/Category/Categories'
import { Recommended } from '../Shared Components/Recommended/Recommended'
import { StaticBanner } from '../Shared Components/Banner/StaticBanner'
import { useOutletContext } from 'react-router'

import CenterMode from '../Shared Components/Banner/Slider Banner/CenterMode'
import { WhyChooseUs } from '../Why Choose Us/WhyChooseUs'
import GlobalReachMap from '../Global Map/GlobalReachMap'
import TestimonialsSlider from '../Testimonials/Testimonials'
import { Certificate } from '../Certificate/Certificate'


export const Home = () => {

    const context = useOutletContext()
    return (
        <div className='space-y-10'>
            <CenterMode></CenterMode>
            <WhyChooseUs></WhyChooseUs>
            {/* <SliderContent></SliderContent> */}

            <Categories categories={context.categories}></Categories>

            <GlobalReachMap></GlobalReachMap>
            <StaticBanner></StaticBanner>
            <Certificate></Certificate>
            <Recommended></Recommended>
            <TestimonialsSlider></TestimonialsSlider>

        </div>
    )
}
