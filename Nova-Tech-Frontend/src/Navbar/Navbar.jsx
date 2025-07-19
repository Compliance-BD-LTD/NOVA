import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { capitalizeWords, urlConverter } from '../Functions/functions';
import { removeUser } from '../State Management/NovaStore';
import { SideNavbar } from './SideNav/SideNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faComment, faHome, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const Navbar = ({ products, categories }) => {
    const [showMegaBar, setShowMegaBar] = useState(false);
    const megaBarRef = useRef(null);
    const navigate = useNavigate();
    const user = useSelector((state) => state.NovaTech.users);
    const logo = useSelector((state) => state.NovaTech.logo);
    const dispatch = useDispatch();
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');
    const categoriesBtnRef = useRef(null);

    // Close megabar when clicking outside
    // useEffect(() => {
    //     function handleClickOutside(event) {
    //         if (megaBarRef.current && !megaBarRef.current.contains(event.target)) {
    //             setShowMegaBar(false);
    //         }
    //     }
    //     if (showMegaBar) {
    //         document.addEventListener('mousedown', handleClickOutside);
    //     }
    //     document.addEventListener('mousedown', handleClickOutside);
    //     console.log('showMegabar', showMegaBar)
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };

    // }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedOutsideMegaBar = megaBarRef.current && !megaBarRef.current.contains(event.target);
            const clickedOutsideButton = categoriesBtnRef.current && !categoriesBtnRef.current.contains(event.target);

            if (clickedOutsideMegaBar && clickedOutsideButton) {
                setShowMegaBar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className='relative'>
            {/* Main Navbar */}
            <div className="navbar bg-base-100 shadow-sm md:px-10 px-5 z-20 sticky top-0">
                <div className="navbar-start space-x-4">
                    <div className="dropdown">
                        <label htmlFor="navbar-drawer" className="drawer-button lg:hidden">☰</label>
                    </div>
                    <div className='w-25 cursor-pointer block ' onClick={() => navigate('/')}>
                        {logo ?
                            (<img loading="lazy" src={logo[0]} alt="Logo" />)
                            : (<div className='skeleton  rounded-sm h-10'></div>)
                        }
                    </div>
                </div>
                <SideNavbar categories={categories} />
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-md font-semibold">
                        {/* Categories Button with Animated Arrow */}
                        <li>
                            <button
                                ref={categoriesBtnRef}
                                className="relative cursor-pointer flex items-center gap-1"
                                onClick={() => setShowMegaBar(!showMegaBar)}
                            >
                                Categories
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className={`transition-transform duration-300 ${showMegaBar ? "rotate-180" : ""}`}
                                    style={{ fontSize: "0.85em" }}
                                />
                            </button>
                        </li>
                        <li className='group'>
                            <div className='group relative'><Link>About</Link></div>
                            <div className='hidden absolute group-hover:block  top-full left-0  shadow-lg shadow-blue-500  bg-white w-[200px]' >
                                <p className='hover:bg-gray-200 p-3' onClick={() => navigate('/profile')}   > <FontAwesomeIcon icon={faHome} size='sm' ></FontAwesomeIcon>  Profile</p>
                                <p className='hover:bg-gray-200 p-3' onClick={() => navigate('/faq')}> <FontAwesomeIcon icon={faComment} size='sm'  ></FontAwesomeIcon>  FAQ</p>
                            </div>
                        </li>
                        <li className={location.pathname === "/support" ? "border-b-2 border-blue-500" : ""}>
                            <Link to="/support">Support</Link>
                        </li>
                        <li className={location.pathname === "/contact" ? "border-b-2 border-blue-500" : ""}>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        {
                            user && (<li className={location.pathname === "/dashboard" ? "border-b-2 border-blue-500" : ""}><Link to={"/dashboard"} >Dashboard</Link></li>)
                        }
                    </ul >
                </div >
                <div className="navbar-end space-x-5" >
                    <FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => { navigate('/all-products'); }} size='md' className='cursor-pointer' />
                    {
                        user && (<button className="btn rounded-md hover:bg-blue-700 text-blue-700 hover:text-gray-200 " onClick={() => dispatch(removeUser())} >Logout</button>)
                    }
                    {isDashboard && (
                        <label
                            htmlFor="dashboard-drawer"
                            className="drawer-button lg:hidden"
                        >
                            ☰
                        </label>
                    )}
                </div>
            </div>
            {/* MegaBar */}
            {showMegaBar && (
                <div
                    ref={megaBarRef}
                    // style={{ width: "1340px", margin: "20px auto" }}
                    className="bg-white absolute  w-full max-w-[1340px] left-1/2 right-1/2 transform -translate-x-1/2 top-full shadow-2xl shadow-blue-500 rounded-lg z-50 "
                >
                    <div className='flex justify-end p-4'>
                        <div
                            className='cursor-pointer hover:scale-105 text-blue-500'
                            onClick={() => { setShowMegaBar(false); navigate('/all-products'); }}
                        >
                            View All Products
                        </div>
                    </div>
                    <section className="grid grid-cols-4 gap-6 px-8 pb-8">
                        {categories && categories.map((item, index) => (
                            <div
                                key={index}
                                className='overflow-hidden cursor-pointer flex flex-col items-center'
                                onClick={() => { setShowMegaBar(false); navigate(`/category/${urlConverter(item?.name)}`); }}
                            >
                                <img
                                    loading="lazy"
                                    src={item?.imageUrl || `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png`}
                                    className='w-[200px] rounded-md h-[100px] object-cover mb-2'
                                    alt={item?.name}
                                />
                                <Link className="text-center w-full" to={`/category/${urlConverter(item?.category)}`}>
                                    {capitalizeWords(item?.name)}
                                </Link>
                            </div>
                        ))}
                    </section>
                </div>
            )}
        </div>
    );
};