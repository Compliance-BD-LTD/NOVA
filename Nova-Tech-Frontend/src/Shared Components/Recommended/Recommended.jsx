import { faArrowRight, faChevronLeft, faChevronRight, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate, useOutletContext } from "react-router";
import { ProductCard } from "../../Home/Component/HeroSection/Category/Product_Category/ProductCard";

export const Recommended = () => {
    const products = useOutletContext().products;
    const [sortedProduct, setSortedProduct] = useState([]);

    useEffect(() => {
        if (products) {
            const sort = products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setSortedProduct(sort);
        }
    }, [products]);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: products && products.length > 4 ? 4 : products && products.length,
        slidesToScroll: 1,
        autoplay: products && products.length > 4,
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
                    dots: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };

    const navigate = useNavigate();

    return (
        <section className="md:max-w-[1340px] md:mx-auto space-y-5 px-3 my-5">
            <p className="font-bold text-xl">
                Recommended 
                <span onClick={() => navigate("/all-products")} className="text-blue-700 ml-3 text-sm font-semibold hover:scale-105 cursor-pointer">
                    View all  <FontAwesomeIcon icon={faArrowRight} />
                </span>
            </p>

            <section className="slider-container relative">
                {/* React Slick Slider */}
                <Slider {...settings}>
                    {products
                        ? sortedProduct.map((item, index) => (
                            <div key={index}>
                                <ProductCard item={item} />
                            </div>
                        ))
                        : [1, 2, 3].map((_, index) => (
                            <div className="p-2 w-[200px]">
                                <div key={index} className="flex flex-col space-y-3">
                                    <div className="skeleton h-[200px] w-full"></div>
                                    <div className="skeleton h-4 w-28"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                </div>
                            </div>

                        ))}
                </Slider>
            </section>
        </section>
    );
};

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => {
    return (
        <div
            className="absolute top-1/2 md:-left-2 bg-transparent backdrop-blur-5xl left-2 h-full transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer z-5"
            onClick={onClick}
        >

            <div className="flex items-center justify-center h-full">
                <FontAwesomeIcon icon={faChevronLeft} size="2x" />
            </div>

        </div>
    );
};

const NextArrow = ({ onClick }) => {
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