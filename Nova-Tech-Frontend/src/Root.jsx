import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { Footer } from './Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addLogo } from './State Management/NovaStore'
import { socket } from './Socket/socket'
import { Bounce, toast, ToastContainer } from 'react-toastify'


export const Root = () => {


  const [products, setProducts] = useState(null)
  const [categories, setCategories] = useState(null)
  const [queries, setQueries] = useState([])
  const [banners,setBanners]=useState([])
  const dispatch = useDispatch()
  const admin = useSelector((state) => state.NovaTech.users)

  const data = {
    products: products,
    categories: categories,
    setCategories: setCategories,
    setProducts: setProducts,
    queries: queries,
    setQueries: setQueries,
    banners:banners,
    setBanners:setBanners
  }

  useEffect(() => {


    if (admin && !socket.connected) {
      socket.emit('join')
    }
    socket.on('queries', (data) => {
      setQueries((prev) => [data.data, ...prev])

      toast.info('New Queries😱😱😱!!', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

    })
    return () => {
      socket.off('queries')
    }

  }, [admin])


  useEffect(() => {
    socket.connect()
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getLogo`)
      .then((res) => {
        if (res.status == 200) {
          dispatch(addLogo((res.data.data)))
        }
      })
      .catch((err) => console.log(err))

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getBanners`)
    .then((res) => {
      if (res.status == 200) {
       setBanners(res.data.data)
      }
    })
    .catch((err) => console.log(err))
  }, [])

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getProducts`)
      .then((res) => { setProducts(res.data); })
      .catch((err) => console.log(err))


    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getCategories`)
      .then((res) => {
        setCategories(res.data)
      })
      .catch((err) => console.log(err))


    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getQueries`)
      .then((res) => setQueries(res.data.data))
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,

        });
      })

  }, [])


  return (
    <div>
      <ToastContainer></ToastContainer>
      <Navbar products={products} categories={categories} ></Navbar>
      <Outlet context={data} ></Outlet>
      <Footer></Footer>



    </div>
  )
}
