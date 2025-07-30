import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import img1 from "../assets/Images/World Map/1.jpg"
import img2 from "../assets/Images/World Map/2.jpg"
import img3 from "../assets/Images/World Map/3.jpg"
import img4 from "../assets/Images/World Map/4.jpg"
import img5 from "../assets/Images/World Map/5.jpg"
import img6 from "../assets/Images/World Map/6.jpg"
import img7 from "../assets/Images/World Map/7.jpg"

const demoMap = 'https://cdn.pixabay.com/photo/2014/04/02/14/09/world-map-306338_1280.png';

const locations = [

    {
        id: 5,
        image: img3,
        position: 'top-[35%] right-[25%]'
    },
    {
        id: 4,
        image: img4,
        position: 'bottom-[30%] left-[25%]'
    },
    {
        id: 1,
        image: img1,
        position: 'top-10 right-[30%]'
    },
    {
        id: 2,
        image: img2,
        position: 'top-20 left-[18%]'
    },



    {
        id: 6,
        image: img6,
        position: 'bottom-[45%] left-[50%]'
    },
    {
        id: 7,
        image: img7,
        position: 'bottom-[20%] right-[12%]'
    }
];

export default function GlobalReachMap() {
    const [visible, setVisible] = useState([]);

    useEffect(() => {
        const timers = locations.map((_, i) =>
            setTimeout(() => {
                setVisible((prev) => [...prev, i]);
            }, i * 800)
        );
        return () => timers.forEach((t) => clearTimeout(t));
    }, []);

    useEffect(() => {
        let interval;

        const animatePins = () => {
            setVisible([]);
            locations.forEach((_, i) => {
                setTimeout(() => {
                    setVisible((prev) => [...prev, i]);
                }, i * 600); // animation delay between pins
            });
        };

        animatePins(); // initial trigger

        interval = setInterval(() => {
            animatePins(); // repeat every X seconds
        }, locations.length * 600 + 2000); // wait till all pins show + pause

        return () => clearInterval(interval); // clean on unmount
    }, []);

    return (
        <div className='bg-base-100'>
            <section className="relative  py-12 px-4 max-w-[1340px] hidden lg:block  mx-auto">
                <h2 className="text-5xl font-bold text-center mb-8">Our Global Presence</h2>
                <div className="relative w-full h-[600px]">
                    <img src={demoMap} alt="world map" className="w-full h-full object-contain" />

                    {locations.map((loc, i) => (
                        <motion.div
                            key={loc.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={visible.includes(i) ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5 }}
                            className={`absolute ${loc.position} w-17 h-17 rounded-full border-4 border-white shadow-lg overflow-hidden z-10`}
                        >
                            <img
                                src={loc.image}
                                alt={`location-${loc.id}`}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>

    );
}
