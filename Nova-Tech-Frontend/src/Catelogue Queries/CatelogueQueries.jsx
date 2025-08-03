import React, { useEffect, useState } from 'react'

import { useLocation, useOutletContext } from 'react-router'


import { QueryModal } from '../Queries/QueryModal'
import { capitalizeWords } from '../Functions/functions'
import { DateTime } from '../Date Time Formate/DateTime'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faPlus } from '@fortawesome/free-solid-svg-icons'
import { UploadCatalogue } from '../Dashboard/FileUpload/UploadCatalogue'
import { RequireCatelogue } from '../Catelog/RequireCatelogue'
import axios from 'axios'
import Swal from 'sweetalert2'
export const CatelogueQueries = () => {
    const { queries } = useOutletContext()
    const [description, setDescription] = useState(null)
    const [loading, setLoading] = useState(false)
    const { cataLogue, setCatalogue } = useOutletContext()

    const location = useLocation()
    const handleDelete = async (post) => {

        if (post) {
            const formData = {
                id: post._id
            }


            Swal.fire({
                title: `Do you want Delete ${post.name}  Catalogue 😔 ?`,
                showDenyButton: true,
                confirmButtonText: "Save",
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    
                    
                    setLoading(true)

                    
                    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteCatalogue`, { data: { id: post._id } })
                        .then((res) => {
                            if (res.status == 200) {
                                Swal.fire({
                                    icon: "success",
                                    title: `${post?.name} got deleted`,
                                    text: "Deletion successful!",

                                });

                                setCatalogue(res.data.data);

                            }
                            else if (res.status == 403) {
                                Swal.fire({
                                    icon: "error",
                                    title: `${res.data.message}`
                                })
                            }



                        })
                        .catch((error) => {
                            Swal.fire({
                                icon: "error",
                                title: "Oops Image Couldnt Select...",
                                text: error.message

                            });
                        })
                    setLoading(false)

                }
            });

        } else {
            Swal.fire("Changes are not saved", "", "info");
        }



    }



    return (
        <div className=' w-full h-screen'>
            <div className="overflow-x-auto max-sm:text-center my-10">

                <label htmlFor="my_modal_6" className='btn text-base font-semibold hover:bg-blue-500 bg-blue-500 rounded-md text-white  '>
                    Add Catalogue <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>
                </label>


            </div>

            <div className="flex md:flex-wrap flex-col md:flex-row  justify-center items-center gap-10 max-w-[1340px] mx-auto">

                {
                    !cataLogue && [1, 2, 3, 4].map((item, index) => {
                        return (
                            <div key={index} className="skeleton h-[250px] w-[350px]"></div>
                        )
                    })
                }


                {
                    cataLogue && cataLogue.map((item, index) => {
                        return (
                            <section className=' relative  group' key={index}  >
                                <div className="w-[300px] cursor-pointer hover:scale-105 transition-all duration-300 " onClick={() => !loading ? window.location.href = item?.pdf : ''}>
                                    <img src={item?.imageUrl[0]} alt="" className={`${loading && `opacity-50`}`} />
                                    <div className="group">
                                        <p className="group-hover:underline text-lg text-center font-semibold text-gray-700">{item?.name}  <FontAwesomeIcon icon={faDownload} > </FontAwesomeIcon></p>
                                    </div>


                                </div>

                                {location.pathname.startsWith('/dashboard') && (
                                    <div className="absolute top-3 bg-white right-3 md:opacity-0 opacity-100  group-hover:opacity-100 transition-opacity duration-300 space-x-2 ">
                                        {item ? null : (
                                            <button className="btn btn-primary btn-dash px-2 rounded-sm" disabled>
                                                Update
                                            </button>
                                        )}

                                        {
                                            !loading && (
                                                <button
                                                    className="btn btn-error btn-dash px-1 rounded-sm"
                                                    onClick={() => !loading ? handleDelete(item) : ''}
                                                >
                                                    Delete?
                                                </button>

                                            )
                                        }





                                    </div>
                                )}


                                {
                                    loading && (
                                        <div className='absolute top-1/2 left-1/2  transform -translate-x-1/2 text-gray-900  -translate-y-1/2  '>
                                            <span className="loading loading-spinner w-[50px] "></span>
                                        </div>
                                    )


                                }






                            </section>

                        )
                    })
                }


            </div>

            <QueryModal description={description} ></QueryModal>


            <UploadCatalogue></UploadCatalogue>


        </div>
    )
}
