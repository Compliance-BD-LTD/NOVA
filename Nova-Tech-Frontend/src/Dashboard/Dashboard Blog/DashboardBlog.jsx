import React from 'react'
import { Blog } from '../../Blog/Blog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { BlogUpload } from '../FileUpload/BlogUpload'
import { useOutletContext } from 'react-router-dom'

export const DashboardBlog = () => {
    const { blogs, setBlogs } = useOutletContext()
    return (
        <div className='w-full p-5 space-y-5'>
            <p className='md:text-5xl text-3xl text-center'>Blogs</p>
            <br />
            <div className=''>
                <button className='btn bg-blue-500 text-white hover:bg-blue-500' onClick={() => document.getElementById('BlogUpload').checked = true} >Add New Blog <FontAwesomeIcon icon={faPlus} size='md' ></FontAwesomeIcon></button>
            </div>
            <BlogUpload></BlogUpload>
            <Blog  ></Blog>

        </div>
    )
}
