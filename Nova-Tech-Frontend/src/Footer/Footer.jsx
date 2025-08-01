import React from 'react'
import logo from "../assets/Logo/NOVA LOGO.png"
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

export const Footer = () => {
    const navigate = useNavigate()
    const logo = useSelector((state) => state.NovaTech.logo)
    return (
        <footer className="footer sm:footer-horizontal bg-zinc-700 text-neutral-content px-10 py-4 flex flex-col   ">

            <section className=' flex justify-between max-sm:flex-col items-center w-full max-sm:space-y-5' >
                <div>
                    <aside className='flex max-sm:flex-col max-sm:items-center space-x-2 items-center font-semibold text-lg'>
                        <div className='w-25 cursor-pointer block ' onClick={() => navigate('/')}>

                            {logo ?
                                (
                                    <img loading="lazy" src={logo[0]} alt="Logo" />
                                )
                                :
                                (
                                    <div className='skeleton  rounded-sm h-10'>

                                    </div>
                                )

                            }

                        </div>
                        <p className='max-sm:text-center'>
                            Nova Tech Industry Uk.
                            <br />
                            <span className='text-sm'>Innovative Tech Solutions.</span>
                        </p>
                    </aside>

                </div>



                <div>

                    <p className='font-semibold text-lg'>© Copyright,
                        NOVA, 2024.
                    </p>




                </div>
                <nav className='w-[150px] text-center  space-y-4'>
                    <h6 className="footer-title">Social</h6>
                    <div className="flex justify-around">
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                    <p className='font-semibold text-md text-center'> <FontAwesomeIcon icon={faLocationDot} size='lg' ></FontAwesomeIcon> 128, City Road, London, EC1V 2NX, UNITED KINGDOM.</p>
                </nav>
            </section>
            

        </footer>
    )
}
