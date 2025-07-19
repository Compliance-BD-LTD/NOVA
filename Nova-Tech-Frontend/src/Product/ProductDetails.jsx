import React from 'react'
import { capitalizeWords } from '../Functions/functions'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useLocation, useNavigate, useOutlet, useOutletContext } from 'react-router'
import Swal from 'sweetalert2'

export const ProductDetails = ({ item }) => {
    const admin = useSelector((state) => state.NovaTech.users)
    const { setProducts } = useOutletContext()
    const navigate = useNavigate()
    const location=useLocation()

    const handleDelete = () => {


        if (item._id) {

            const data = {
                id: item._id
            }
            Swal.fire({
                title: "Do you want to Delete this?",
                showDenyButton: true,
                // showCancelButton: true,
                confirmButtonText: "Confirm Delete?",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {

                    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteProduct`, {data})
                        .then((res) => {
                            if (res.status == 200) {
                                setProducts(res.data.data)
                                Swal.fire(res.data.message, "success");
                                navigate('/dashboard/products')
                            }
                        })




                } else if (result.isDenied) {
                    Swal.fire("Ok keep this Product", "", "info");
                }
            });
        } else {
            Swal.fire({
                title: "Not Found",
                icon: "error"
            })
        }


    }
    return (
        <div className='md:w-1/2 p-5'>
            <div className='flex justify-between'>
                <p className='font-bold text-2xl '>
                    {item?.model.toUpperCase()}
                </p>
                {
                    admin && location.pathname.startsWith('/dashboard') &&  (<button className='btn btn-error px-3 text-white py-2 rounded-md' onClick={handleDelete}>Delete</button>)
                }

            </div>

            <p className='font-semibold text-lg'>{capitalizeWords(item?.category)}</p>
            <br />
            <p className='text-base font-md'>
                {item?.description}
            </p>
        </div>
    )
}
