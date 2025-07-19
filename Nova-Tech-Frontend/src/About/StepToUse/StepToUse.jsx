import React from 'react'

import image1 from '../../assets/files/banner/gp_v1.jpg'
import image2 from '../../assets/files/banner/m2.png'
import image3 from '../../assets/files/banner/m3.png'


import { Content } from '../StepToUse/Component/Content'

import { TimeLineMiddle } from '../StepToUse/Component/TimeLineMiddle'


export const StepToUse = () => {


    const Content1 = (
        <div className="text-center">
            <p className="font-bold md:text-2xl text-lg">Guiding Principle</p>
            <p className="font-semibold text-base">We are driven by innovation, integrity, and excellence. Our focus is on delivering reliable, sustainable solutions that empower progress. By fostering trust, quality, and customer-centric approaches, we aim to build lasting partnerships and create impactful advancements in every aspect of our work.</p>
        </div>
    )

    const Content2 = (
        <div className="text-center">
            <p className="font-bold md:text-2xl text-lg">Our Mission</p>
            <p className="font-semibold text-base">We are committed to transforming industries with innovative technology solutions that drive growth and improve efficiency. Our mission is to deliver exceptional products and services that exceed customer expectations, fostering trust and long-term success through collaboration and cutting-edge advancements.</p>
        </div>
    )

    const Content3 = (
        <div className="text-center">
            <p className="font-bold md:text-2xl text-lg">Our Vision</p>
            <p className="font-semibold text-base">We aspire to be a global leader in delivering cutting-edge solutions that drive innovation and sustainable growth. Our vision is to empower businesses with advanced technologies that simplify operations, enhance performance, and create lasting value. Through continuous improvement and a customer-centric approach, we aim to lead by example, inspiring progress and transformation across industries. </p>
        </div>
    )



    return (
        <div>


            <ul className="md:timeline md:timeline-vertical max-sm:space-y-5 ">
                <li>
                    <div className="timeline-start timeline-box">

                        <Content img={image1} content={Content1}  ></Content>

                    </div>
                    <TimeLineMiddle></TimeLineMiddle>

                    <hr className="bg-gray-200  max-sm:hidden " />
                </li>
                <li>
                    <hr className="bg-gray-200  max-sm:hidden " />
                    <TimeLineMiddle></TimeLineMiddle>

                    <div className="timeline-end timeline-box">

                        <Content img={image2} content={Content2}  ></Content>

                    </div>
                    <hr className="bg-gray-200 max-sm:hidden" />
                </li>
                <li>
                    <hr className="bg-gray-200  max-sm:hidden "/>
                    <div className="timeline-start timeline-box">

                        <Content img={image3} content={Content3}  ></Content>

                    </div>
                    <TimeLineMiddle></TimeLineMiddle>
                    <hr className="bg-gray-200 max-sm:hidden"  />
                </li>
                {/* <li>
                <hr className="bg-gray-200" />
                    <TimeLineMiddle></TimeLineMiddle>
                    <div className="timeline-end timeline-box">

                        <Content img={UploadImage} content={Content4}  ></Content>

                    </div>

                    <hr className="bg-gray-200" />
                </li>
                <li>
                <hr className="bg-gray-200" />
                    <div className="timeline-start timeline-box">

                        <Content img={SendMessage} content={Content5}  ></Content>

                    </div>
                    <TimeLineMiddle></TimeLineMiddle>
                    <hr className="bg-gray-200" />
                </li>
                <li>
                <hr className="bg-gray-200" />
                    <TimeLineMiddle></TimeLineMiddle>
                    <div className="timeline-end timeline-box">

                        <Content img={GroupChat} content={Content6}  ></Content>

                    </div>
                    <hr className="bg-gray-200" />
                </li>

                <li>
                <hr className="bg-gray-200"  />
                    <TimeLineMiddle></TimeLineMiddle>
                    <div className="timeline-start timeline-box">

                        <Content img={CreateAccount} content={Content7}  ></Content>

                    </div>
                </li> */}

            </ul>
        </div>
    )
}
