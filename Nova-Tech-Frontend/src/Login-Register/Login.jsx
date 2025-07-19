import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { addUser } from '../State Management/NovaStore'
import axios from 'axios'

export const Login = () => {
    const [formType, setFormType] = useState('login')
    const user = useSelector((state) => state.NovaTech.users)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    let [formData, setFormData] = useState({
        'name': '',
        'email': '',
        'employee_id': '',
        'password': '',
        'confirmPassword': '',

    })

    const handleSubmit = async (e) => {
        e.preventDefault()



        if (formType == 'register' && (formData.password == formData.confirmPassword)) {
            delete formData.confirmPassword

            setLoading(true)
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, formData
            ).then((res) => {
                if (res.status == 200) {
                    Swal.fire({
                        title: "Sign Up Successful!",
                        text: "You clicked the button!",
                        icon: "success"
                    })
                } else {

                    Swal.fire({
                        title: "SomeThing Went Wrong!",
                        text: "You clicked the button!",
                        icon: "error"
                    })
                }


            })
                .catch(err => {
          
                    Swal.fire({
                        title: "Server Error!",
                        text: err.response.data.message,
                        icon: "error"
                    })

                })
                .finally(() => {
                    setLoading(false)
                })




        }

        if (formType == 'login') {
            delete formData.name
            delete formData.confirmPassword
            delete formData.employee_id


            setLoading(true)
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, formData)
                .then((res) => {

                    if (res.status == 200) {
               
                        dispatch(addUser(res.data.user))
                        navigate('/')
                        Swal.fire({
                            title: "Login Successful!",
                            text: "You clicked the button!",
                            icon: "success"
                        })






                    } else {
                        Swal.fire({
                            title: "Opps",
                            text: res.data.message,
                            icon: "warning"
                        })

                    }


                })
                .catch(err => {


                    console.log(err)
                    Swal.fire({
                        title: "Opps!",
                        text: err.response.data.message,
                        icon: "error"
                    })
                }


                )
                .finally(() => {
                    setLoading(false)
                })

        }



        setFormData({
            'name': '',
            'email': '',
            'employee_id': '',
            'password': '',
            'confirmPassword': '',


        })
    }

    const handleForm = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value })


    }
    return (
        <div className='h-screen flex justify-center items-center'>
            <form action="" onSubmit={handleSubmit}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">{formType == 'login' ? (
                        <p>Login</p>
                    ) : (
                        <p>Register</p>
                    )}</legend>

                    {
                        formType == 'register' &&
                        (


                            <>
                                <label className="label">Name</label>
                                <input type="text" onChange={handleForm} name='name' required className="input" placeholder="Name" />
                            </>

                        )
                    }


                    {
                        formType == 'register' &&
                        (


                            <>
                                <label className="label">Employee ID</label>
                                <input type="text"  onChange={handleForm} name='employee_id' required className="input" placeholder="Employee ID" />
                            </>

                        )
                    }



                    <label className="label">Email</label>
                    <input type="email" name='email'  onChange={handleForm} required className="input" placeholder="Compliance Email" />

                    <label className="label">Password</label>
                    <input type="text" required className="input"  onChange={handleForm} name='password' placeholder="Compliance Password" />
                    {
                        formType == 'register' &&
                        (


                            <>
                                <label className="label">Confirm Password</label>
                                <input type="text"  onChange={handleForm} required name='confirm-password' className="input" placeholder="Confirm Password" />
                            </>

                        )
                    }



                    <div className='flex justify-between'>
                        {
                            formType == 'login' ?
                                (
                                    <p className='cursor-pointer  hover:underline' onClick={() => setFormType('register')}>Register?</p>
                                )
                                :
                                (
                                    <p className='cursor-pointer  hover:underline' onClick={() => setFormType('login')}>Already admin?</p>
                                )
                        }
                        {
                            formType == 'login' ?
                                (
                                    <p className='cursor-pointer hover:underline'>Forget Password?</p>
                                )
                                :
                                ''
                        }

                    </div>

                    <button className="btn btn-neutral mt-4"> {formType == 'login' ? ('Login') : ('Register')} {loading && (<span className="loading loading-spinner loading-xs"></span>)} </button>
                </fieldset>
            </form>



        </div>
    )
}
