import React, { useEffect } from "react";
import Slider from "react-slick";
import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AOS from 'aos';
import 'aos/dist/aos.css';


// Liberty Air Wheel related testimonials
// Pump-related testimonials for Liberty Pump
const testimonials = [
    {
        name: "Liam Parker",
        title: "Event Manager, SonicHire Events",
        img: "https://randomuser.me/api/portraits/men/33.jpg",
        tool: "PA System",
        rating: 5,
        text: "Nova Tech’s PA system delivers crisp, clear sound even in large outdoor setups. Easy to operate and highly reliable for live events.",
    },
    {
        name: "Ava Mitchell",
        title: "AV Consultant, Urban Audio",
        img: "https://randomuser.me/api/portraits/women/39.jpg",
        tool: "Outdoor Column Speaker",
        rating: 5,
        text: "The outdoor column speakers from Nova Tech are sleek and powerful. They offer excellent coverage with weatherproof build quality.",
    },
    {
        name: "Noah Foster",
        title: "Facilities Supervisor, Greenfield School",
        img: "https://randomuser.me/api/portraits/men/72.jpg",
        tool: "Indoor Speaker",
        rating: 4,
        text: "Nova Tech’s indoor speakers blend in perfectly and provide rich sound for classrooms and hallways. Installation was smooth and clean.",
    },
    {
        name: "Isabella Reed",
        title: "Systems Integrator, AudioEdge Ltd.",
        img: "https://randomuser.me/api/portraits/women/63.jpg",
        tool: "Wall Mount Speaker",
        rating: 5,
        text: "We use Nova Tech wall-mount speakers in multiple office installations. Great clarity, and the adjustable bracket design is very user-friendly.",
    },
];




const PrevArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute left-0 md:text-lg top-50/100 md:top-1/2 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
    >
        <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
    </button>
);

const NextArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute right-0 md:text-lg top-50/100 md:top-1/2 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
    >
        <FontAwesomeIcon icon={faChevronRight} size="2xl" />
    </button>
);

const settings = {
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3500,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 800, settings: { slidesToShow: 1 } },
        { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
    appendDots: dots => (
        <div>
            <ul style={{ margin: "0px" }}>{dots}</ul>
        </div>
    ),
    customPaging: () => (
        <span
            style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#ffc107",
                margin: "0 4px"
            }}
        />
    ),
};
const TestimonialsSlider = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <section

            className="w-full py-14 max-w-[1340px] mx-auto flex flex-col items-center bg-white"
        >
            <div className="w-full mx-auto px-2">
                <div className="text-center mb-10">

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-1">
                        WHAT OUR <span className="text-blue-500">CLIENTS SAY</span>
                    </h2>
                    <div className="w-16 h-1 bg-blue-500 rounded mx-auto mb-2" />
                </div>
                <Slider {...settings}>
                    {testimonials.map((item, idx) => (
                        <div key={idx} className="p-3">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm py-8 px-6 flex flex-col items-center text-center min-h-[340px] relative transition-all duration-300 hover:shadow-md">
                                <div className="flex justify-center mb-5">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
                                    />
                                </div>
                                <h4 className="font-semibold text-lg mb-2 text-gray-700">
                                    {item.title}
                                </h4>
                                <p className="text-gray-500 text-base mb-2">{item.text}</p>
                                <div className="mt-1">
                                    <span className=" text-gray-700 text-base font-semibold">{item.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

            </div>
        </section>
    );
};
export default TestimonialsSlider;