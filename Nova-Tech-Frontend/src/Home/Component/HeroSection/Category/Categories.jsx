import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import { useNavigate } from "react-router";
import { capitalizeWords, urlConverter } from "../../../../Functions/functions";

export const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 md:-left-2 left-2 h-full transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer z-5"
      onClick={onClick}
    >

      <div className="flex items-center justify-center h-full">
        <FontAwesomeIcon icon={faChevronLeft} size="2x" />
      </div>

    </div>
  );
};

export const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 md:-right-2 h-full right-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer z-5"
      onClick={onClick}
    >

      <div className="flex items-center justify-center h-full">
        <FontAwesomeIcon icon={faChevronRight} size="2x" />
      </div>



    </div>
  );
};

export const Categories = ({ categories }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleClick = (item) => {
    navigate(`/category/${urlConverter(item?.name)}`);
  };

  return (
    <section className="max-w-[1340px] mx-auto px-3 space-y-5">
      <div className="text-center">
        <p className="font-bold text-3xl text-gray-700">Categories</p>
      </div>
      <div className="slider-container relative rounded-lg space-y-10">
        {/* React Slick Slider */}
        <Slider {...settings}>
          {categories
            ? categories.map((item, index) => (
              <section key={index} className="cursor-pointer" onClick={() => handleClick(item)}>
                <div className="group shadow-lg md:p-3 space-y-2 rounded-lg">
                  <img
                    loading="lazy"
                    src={item?.imageUrl ? item?.imageUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"}
                    alt=""
                    className="w-[300px] h-[200px] rounded-lg max-sm:w-full object-cover hover:scale-105 transition-all duration-150 ease-in-out delay-110 cursor-pointer"
                  />
                  <p className="font-semibold text-xl">{capitalizeWords(item?.name)}</p>
                </div>
              </section>
            ))
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div key={index} className="flex w-[320px] flex-col space-y-3">
                <div className="skeleton h-[200px] w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
};