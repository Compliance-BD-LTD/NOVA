import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { Content } from "../../../Home/Component/HeroSection/Content/Content";
import { useOutletContext } from "react-router";

// Tailwind-styled Previous Arrow
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 md:text-3xl top-25/100 md:top-1/3 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
  >
    <FontAwesomeIcon icon={faChevronLeft} size="2xl" ></FontAwesomeIcon>
  </button>
);

// Tailwind-styled Next Arrow
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 md:text-3xl top-25/100   md:top-1/3 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
  >
    <FontAwesomeIcon icon={faChevronRight} size="2xl" ></FontAwesomeIcon>
  </button>
);

function CenterMode() {

  let { banners } = useOutletContext()
  const settings = {
    className: "center-blur-slider",
    centerMode: true,
    infinite: true,
    centerPadding: "150px", // ↓ smaller padding to bring sides closer
    slidesToShow: 1,
    speed: 1500,
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 3500,

    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 768, // mobile
        settings: {
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480, // small mobile
        settings: {
          centerPadding: "20px",
        },
      },
    ],
  };


  return (
    <div className="relative md:px-4 py-10 max-w-[1340px] mx-auto">
      <Slider {...settings}>
        {


          banners.length > 0 ?


            banners.length > 1 ?
              (

                banners.map((item, index) => (
                  <div key={index} className="bg-transparent">
                    <div className="slide-content w-full rounded-xl space-y-10 relative    transition duration-300">
                      <img loading="lazy" src={item.imageUrl[0] || 'https://res.cloudinary.com/des05ruq7/image/upload/v1748695524/vi3mxypffpliytvhk9lz.jpg'} className=" w-full h-full  rounded-xl object-cover" alt="" />
                      <div>
                        <Content item={item}></Content>
                      </div>
                    </div>
                  </div>
                ))

              )


              :
              (
                [banners[0], banners[0]].map((item, index) => (
                  <div key={index} className="bg-transparent">
                    <div className="slide-content rounded-xl space-y-10 relative    transition duration-300">
                      <img loading="lazy" src={item?.imageUrl[0] || 'https://res.cloudinary.com/des05ruq7/image/upload/v1748695524/vi3mxypffpliytvhk9lz.jpg'} className="w-full object-cover rounded-xl h-full" alt="" />
                      <div>
                        <Content item={item}></Content>
                      </div>
                    </div>
                  </div>
                ))
              )
            :

            (

              [0, 0].map((item, index) => (
                < div key={index} className="space-y-10 md:px-10 px-5" >
                  <div className="skeleton md:min-h-[450px] h-[350px] w-full " ></div>
                  <div className="max-w-[550px] mx-auto space-y-3">
                    <div className="skeleton h-10 w-full"></div>
                    <div className="skeleton h-10 w-full"></div>
                  </div>
                </div>
              ))


            )










        }
      </Slider >

      {/* Custom styles for blur/scale effect */}
      < style > {`
        .center-blur-slider .slick-slide {
          transition: filter 0.3s ease, transform 0.3s ease;
        }
        .center-blur-slider .slick-slide:not(.slick-center) .slide-content {
          filter: blur(3px);
          transform: scale(0.85); /* smaller side slides */
          opacity: 0.5;
        }
      `}</style >
    </div >
  );
}

export default CenterMode;
