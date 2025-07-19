import React from 'react'
import { StaticBanner } from '../../Shared Components/Banner/StaticBanner'
import faqImage from "../../assets/files/banner/faq.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const Faq = () => {
    return (
        <div>

            <div>
                <StaticBanner BannerImg={faqImage}></StaticBanner>
            </div>
            <br />
            <div className='md:flex  md:space-x-5 max-w-[1340px] min-h-[600px] mx-auto px-5 my-10'>
                <div className='space-y-3 md:w-40/100 '>
                    <p className='md:text-5xl text-3xl font-bold'>FAQ</p>
                    <p className='text-lg font-semibold'>What Our Customers Frequently Ask.</p>
                </div>

                <div className='md:w-70/100 space-y-3'>
                    <div className="collapse collapse-plus bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title font-semibold  text-lg">
                            What services do we offer?</div>
                        <div className="collapse-content text-sm  cursor-pointer group flex space-x-2">
                            <p className='text-blue-500 '> We provide cutting-edge technology solutions tailored to meet the diverse needs of our customers, including advanced equipment and innovative systems.</p>

                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title font-semibold  text-lg">

                            How can I place an order or inquire about your products?</div>
                        <div className="collapse-content text-sm  cursor-pointer group flex space-x-2">
                            <p className=' text-blue-500 '> You can contact us directly via our website’s contact form or email us. Our team will respond promptly to assist you.</p>

                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title font-semibold  text-lg">
                            Do you provide customization for products?</div>
                        <div className="collapse-content text-sm  cursor-pointer group flex space-x-2">
                            <p className=' text-blue-500 '> Yes, we specialize in customized solutions to match your specific requirements. Feel free to reach out with your unique needs.</p>

                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title font-semibold  text-lg">
                            What industries do you serve?</div>
                        <div className="collapse-content text-sm  cursor-pointer group flex space-x-2">
                            <p className=' text-blue-500 '>We cater to a wide range of industries, including manufacturing, engineering, and technology, ensuring innovative solutions for every sector.</p>

                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title font-semibold  text-lg">
                            How do I get technical support?</div>
                        <div className="collapse-content text-sm  cursor-pointer group flex space-x-2">
                            <p className=' text-blue-500 '> Our dedicated support team is available to assist you. Contact us through our support page or email for quick resolutions.</p>

                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title font-semibold  text-lg">
                            Do you have a warranty policy?</div>
                        <div className="collapse-content text-sm  cursor-pointer group flex space-x-2">
                            <p className=' text-blue-500 '>Yes, all our products come with a warranty. Please refer to the product details or contact our team for specific terms.</p>

                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title font-semibold  text-lg">
                            Do you offer installation or setup services?</div>
                        <div className="collapse-content text-sm  cursor-pointer group flex space-x-2">
                            <p className=' text-blue-500 '>Yes, we offer professional installation services for certain products. Contact us to learn more about availability in your area.</p>

                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title font-semibold  text-lg">
                            How can I contact customer support?</div>
                        <div className="collapse-content text-sm  cursor-pointer group flex space-x-2">
                            <p className=' text-blue-500 '>You can reach our support team via email, phone, or the contact form on our website. Our team is ready to assist you.</p>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
