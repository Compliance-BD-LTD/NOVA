import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router'
import { DynamicBanner } from '../Shared Components/Banner/DynamicBanner'
import Amplifier from "../assets/files/banner/PA_B1.jpg"
import { ProductImage } from './ProductImage'
import { ProductDetails } from './ProductDetails'
import { ProductInfo } from './ProductInfo'
export const Product = () => {
    const { model } = useParams()
    const [item, setItem] = useState(null)
    const products = useOutletContext().products
    const [categoryItem, setCategoryItem] = useState(null)
    const categories = useOutletContext().categories

    useEffect(() => {
        if (products && categories) {
            const p = products.find((item) => item?.model == model)
            setItem(p)
            if (p) {
                const category = categories.find((item) => item?.name?.toLowerCase() == p.category.toLowerCase())
                if(category){
                    setCategoryItem(category)
                }
                else{
                    setCategoryItem(-1)
                }
                

            }

        }
    }, [products,categories])


    console.log('item',item);
    

    return (

        <div className='max-w-[1440px] mx-auto px-5 space-y-10'>
            {
                item ?
                    (
                        <DynamicBanner item={categoryItem} ></DynamicBanner>
                    )
                    :
                    (
                        <div className="skeleton w-full h-[300px]"></div>
                    )
            }


            <section className='flex justify-between max-sm:flex-col md:space-x-5 max-sm:space-y-5'>

                {
                    item ?
                        (
                            <ProductImage item={item}></ProductImage>

                        )
                        :
                        (
                            <div className="skeleton w-1/2 h-[300px]"></div>
                        )
                }

                {
                    item ?
                        (
                            <ProductDetails item={item}></ProductDetails>

                        )
                        :
                        (
                            <div className="skeleton w-1/2 h-[300px]"></div>
                        )
                }

            </section>

            <section className='w-70/100 mx-auto'>
                {
                    item ?
                        (
                            <ProductInfo item={item}></ProductInfo>


                        )
                        :
                        (
                            <div className='space-y-5 mb-10'>
                                <div className="skeleton w-full h-[55px]"></div>
                                <div className="skeleton w-full h-[55px]"></div>
                            </div>
                        )
                }

            </section>
        </div>


    )
}
