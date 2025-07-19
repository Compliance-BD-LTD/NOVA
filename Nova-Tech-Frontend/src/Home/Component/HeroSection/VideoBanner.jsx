import React from 'react'
import Video1 from "../../../assets/videos/BG_V7.mp4"
import Video2 from "../../../assets/videos/BG_V8.mp4"
export const VideoBanner = () => {
    return (
        <div className='flex max-sm:flex-col'>

            <div className='relative'>
                <video src={Video1}

                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full object-cover"
                ></video>


                <div className='absolute bottom-5 left-5'>
                    <p className='text-xl font-semibold text-gray-300'>
                        Nova
                    </p>
                    <p className='text-2xl font-semibold text-gray-300'>
                        Innovative Tech Solution
                    </p>
                </div>

            </div>

            <div>
                <video src={Video2}

                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full object-cover"
                ></video>

            </div>



        </div>
    )
}
