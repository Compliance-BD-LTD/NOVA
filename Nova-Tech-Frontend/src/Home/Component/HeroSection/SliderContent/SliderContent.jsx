import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';



export const SliderContent = () => {


    var settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autolay:true,


        customPaging: function () {
            return (
                <div className="w-3 h-3 rounded-full mt-2  bg-gray-400 transition-all duration-300"></div>
            );
        },

        appendDots: dots => (
            <div>
                <ul className="flex justify-center gap-3 mt-4">{dots}</ul>
            </div>
        ),




    };


    return (
        <section className=' bg-gray-100 p-10'>
            <div className='text-center slider-container font-semibold '>
                <Slider {...settings} >



                    <div>
                        <p>High-Performance Audio for Every Setting with Our Speaker Range <br />

                            – NT – All</p>
                    </div>
                    <div>
                        <p>Sound That Fits Every Need from Indoor Ambiance to Outdoor Performance <br />

                            – NT – I/O-Series</p>
                    </div>
                    <div>
                        <p>Unleash the Power of Sound with Versatile Speakers for All Environments <br />

                            – Best choice – Stuff</p>
                    </div>

                </Slider>


            </div>
        </section>

    )
}
