import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from './Root.jsx'
import { Home } from './Home/Home.jsx'
import { Category } from './Home/Component/HeroSection/Category/Product_Category/Category.jsx'
import { Product } from './Product/Product.jsx'
import { AllProducts } from './Product/AllProducts.jsx'
import { Login } from './Login-Register/Login.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './State Management/store.js'
import { Provider } from 'react-redux'
import { Dashboard } from './Dashboard/Dashboard.jsx'
import { DashboardCategories } from './Dashboard/Dashboard Categories/DashboardCategories.jsx'
import { Profile } from './About/Profile.jsx'
import { Faq } from './About/Faq/Faq.jsx'
import { Contact } from './Contact/Contact.jsx'
import AdminDashboard from './Dashboard/Home/AdminDashboard.jsx'
import { Support } from './Support/Support.jsx'
import { Queries } from './Dashboard/Queries/Queries.jsx'
import { DashboardBanner } from './Dashboard/Dashboar Banner/DashboardBanner.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/category/:categoryName",
        element: <Category></Category>,


      },
      {
        path:"/profile",
        element:<Profile></Profile>
      },
      {
        path:"/faq",
        element:<Faq></Faq>
      },
      {
        path:"/contact",
        element:<Contact></Contact>
      },
      {
        path: "/support",
        element: <Support></Support>
      },
      {
        path: "/products/:model",
        element: <Product></Product>
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children:[
          {
            path:"/dashboard",
            element:<AdminDashboard></AdminDashboard>
          },
          {
            path:"/dashboard/products",
            element:<AllProducts></AllProducts>
          },
          {
            path:'/dashboard/categories',
            element:<DashboardCategories></DashboardCategories>
          },
          {
            path:'/dashboard/queries',
            element:<Queries></Queries>
          },
          {
            path:'/dashboard/banners',
            element:<DashboardBanner></DashboardBanner>
          }
        ]
      }

    ],

  },
  {
    path: "/admin-login",
    element: <Login></Login>
  }

])

createRoot(document.getElementById('root')).render(


  <Provider store={store}>

    <PersistGate loading={<p>Loading From Redux.....</p>} persistor={persistor} >


      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
