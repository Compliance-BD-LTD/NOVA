import { faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { capitalizeWords, urlConverter } from "../../Functions/functions";
import { useSelector } from "react-redux";

export const SideNavbar = ({ categories }) => {
    const [isCategoriesOpen, setCategoriesOpen] = useState(false);
    const [isAboutOpen, setAboutOpen] = useState(false);
    const navigate = useNavigate()
    const admin = useSelector((state) => state.NovaTech.users)
    return (
        <div className="drawer w-[300px]  z-20 sticky">
            <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side ">
                <label htmlFor="navbar-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-blue-50 w-2/3 space-y-5 text-center font-semibold text-gray-200 min-h-full md:text-lg p-4">
                    {/* Close Button for Mobile */}
                    <div className="flex flex-row-reverse md:hidden">
                        <div>
                            <label htmlFor="navbar-drawer" className="drawer-button">
                                <FontAwesomeIcon icon={faXmark} className="text-red-500" size="lg" />
                            </label>
                        </div>
                    </div>

                    {/* FAQ-Style Categories Section */}
                    <li className="cursor-pointer  z-50">
                        <div className="flex space-x-2  items-center px-3 py-2 font-bold rounded-md btn btn-soft text-blue-700" onClick={() => setCategoriesOpen(!isCategoriesOpen)}>
                            <span>Categories</span>
                            <FontAwesomeIcon icon={faChevronDown} className={`transition-transform duration-300 ${isCategoriesOpen ? "rotate-180" : ""}`} />
                        </div>
                        <div className={`w-full flex-col bg-blue-50 shadow-md text-blue-700 mt-3  ${isCategoriesOpen ? `block` : `hidden`}  top-full`}>

                            <div className="flex flex-row-reverse">
                                <div className="text-xs  text-blue-700 underline" onClick={() => { navigate('/all-products'); document.getElementById('navbar-drawer').checked = false; }}>
                                    View All Products
                                </div>
                            </div>

                            <div className="w-full space-y-2 p-2">
                                {
                                    categories && categories.map((item, index) => {
                                        return (
                                            <p onClick={() => { navigate(`/category/${urlConverter(item?.name)}`); document.getElementById("navbar-drawer").checked = false; }} key={index} className="text-md cursor-pointer ">{capitalizeWords(item?.name)}</p>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </li>

                    {/* FAQ-Style About Section */}
                    <li className="cursor-pointer">
                        <div className="flex space-x-2  items-center px-3 py-2 font-bold rounded-md btn btn-soft text-blue-700" onClick={() => setAboutOpen(!isAboutOpen)}>
                            <span>About</span>
                            <FontAwesomeIcon icon={faChevronDown} className={`transition-transform duration-300 ${isAboutOpen ? "rotate-180" : ""}`} />
                        </div>
                        <div className={`w-full flex-col  bg-blue-50 shadow-md  text-blue-700 mt-3   ${isAboutOpen ? `block` : `hidden`}  top-full`}>
                            <div className="w-full  p-2 ">
                                <div className="space-y-2">
                                    <p onClick={() => { navigate('/faq'); document.getElementById("navbar-drawer").checked = false; }}>FAQ</p>
                                    <p onClick={() => { navigate('/profile'); document.getElementById("navbar-drawer").checked = false; }}>Profile</p>
                                </div>
                            </div>

                        </div>
                    </li>

                    {/* Clickable Items */}
                    <li className="cursor-pointer px-3 py-2 font-bold rounded-md btn btn-soft text-blue-700 hover:bg-blue-600" onClick={()=>{navigate('/support');document.getElementById("navbar-drawer").checked = false;}} >
                        Support
                    </li>

                    <li onClick={() => { navigate('/contact'); document.getElementById("navbar-drawer").checked = false; }} className="cursor-pointer px-3 py-2 font-bold rounded-md btn btn-soft text-blue-700 hover:bg-blue-600" >
                        Contact


                    </li>

                    {
                        admin && (
                            <li onClick={() => {
                                navigate('/dashboard');
                                document.getElementById("navbar-drawer").checked = false;
                            }} className="cursor-pointer px-3 py-2 font-bold rounded-md btn btn-soft text-blue-700 hover:bg-blue-600" >
                                Dashboard
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
};