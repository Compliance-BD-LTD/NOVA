import React, { useState, useEffect, useRef } from "react";

// Example slides (you can change color and title)
const slides = [
  { color: "bg-red-400", title: "One" },
  { color: "bg-green-400", title: "Two" },
  { color: "bg-blue-400", title: "Three" },
  { color: "bg-yellow-400", title: "Four" },
  { color: "bg-purple-400", title: "Five" },
];

export default function BlurPeekTailwindSlider() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(false); // For dark fade effect
  const timeout = useRef();
  const fadeTimeout = useRef();

  const prevIdx = (idx - 1 + slides.length) % slides.length;
  const nextIdx = (idx + 1) % slides.length;

  // Autoplay
  useEffect(() => {
    timeout.current = setTimeout(() => handleFadeTo(nextIdx), 3500);
    return () => clearTimeout(timeout.current);
    // eslint-disable-next-line
  }, [idx]);

  const handleFadeTo = (newIdx) => {
    setFade(true);
    fadeTimeout.current = setTimeout(() => {
      setIdx(newIdx);
      setFade(false);
    }, 400); // Fade duration (ms)
  };

  const goPrev = () => handleFadeTo(prevIdx);
  const goNext = () => handleFadeTo(nextIdx);

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
      clearTimeout(fadeTimeout.current);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2">
      <div className="relative w-full max-w-lg sm:max-w-2xl md:max-w-3xl h-[220px] sm:h-[280px] md:h-[350px] flex items-center overflow-hidden">
        {/* Previous peek */}
        <div className="absolute left-0 top-0 h-full flex items-center z-10 w-[60px] sm:w-[90px] md:w-[120px]">
          <div className={`w-full h-4/5 ${slides[prevIdx].color} blur-md opacity-60 rounded-xl flex items-center justify-center text-base sm:text-xl md:text-2xl font-bold`}>
            {slides[prevIdx].title}
          </div>
        </div>
        {/* Next peek */}
        <div className="absolute right-0 top-0 h-full flex items-center z-10 w-[60px] sm:w-[90px] md:w-[120px]">
          <div className={`w-full h-4/5 ${slides[nextIdx].color} blur-md opacity-60 rounded-xl flex items-center justify-center text-base sm:text-xl md:text-2xl font-bold`}>
            {slides[nextIdx].title}
          </div>
        </div>
        {/* Main slide */}
        <div className="mx-auto w-[65vw] max-w-[340px] sm:max-w-[480px] h-[75vw] max-h-[170px] sm:max-h-[240px] md:max-h-[320px] transition-all duration-400 ease-in-out flex items-center justify-center rounded-2xl shadow-lg bg-white relative overflow-hidden">
          <div className={`w-full h-full flex flex-col items-center justify-center ${slides[idx].color} rounded-2xl text-2xl sm:text-4xl font-bold text-white`}>
            {slides[idx].title}
          </div>
          {/* Fade overlay */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-400 pointer-events-none ${
              fade ? "opacity-60" : "opacity-0"
            }`}
          />
        </div>
        {/* Arrows */}
        <button
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full shadow px-2 py-2"
          onClick={goPrev}
          disabled={fade}
        >
          <span className="text-xl sm:text-2xl">&lt;</span>
        </button>
        <button
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full shadow px-2 py-2"
          onClick={goNext}
          disabled={fade}
        >
          <span className="text-xl sm:text-2xl">&gt;</span>
        </button>
      </div>
    </div>
  );
}