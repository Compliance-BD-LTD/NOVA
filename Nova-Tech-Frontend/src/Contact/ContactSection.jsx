import React, { useState } from 'react';
import image from "../assets/files/banner/4.jpg"


export const ContactSection = () => {
  const [contact,setContact]=useState({
    name:'',
    email:'',
    phone:'',
    message:''
  })
  const handleForm=(e)=>{
    setContact({...contact,[e.target.name]:e.target.value})
    console.log('contact',contact)
  }
  return (
    <div className="bg-gray-100 py-10 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>

      {/* Top Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
        <div>
          <div className="text-3xl mb-2">📧</div>
          <h3 className="font-semibold text-lg mb-1">Email Address</h3>
          <p>support@novatechuk.co</p>
          <p>sales@novatechuk.co</p>
        </div>
        <div>
          <div className="text-3xl mb-2">📞</div>
          <h3 className="font-semibold text-lg mb-1">Phone number</h3>
          <p>+44 7737 307868</p>
        </div>
        <div>
          <div className="text-3xl mb-2">📍</div>
          <h3 className="font-semibold text-lg mb-1">Our address</h3>
          <p>128, City Road, London, EC1V 2NX, UNITED KINGDOM</p>
        </div>
      </div>

      {/* Form & Image Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left image (placeholder, replace with yours) */}
        <div className=" bg-gray-300 rounded-md flex items-center justify-center">
          {/* <span className="text-gray-500"><img src={image} alt="" /></span> */}
          <img loading="lazy" src={image} className='   md:h-[300px] lg:h-auto rounded-lg w-full' alt="" />
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="font-bold text-xl mb-1">NOVA</h3>
          <p className="mb-6 text-sm text-gray-600">
            Contact our sales representatives for more information.
          </p>
          <form className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Name *"
                value={contact.name}
                name='name'

                onChange={handleForm}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                name='email'
                placeholder="E-mail *"
                onChange={handleForm}
                value={contact.email}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <input
              type="text"
              name='number'
              value={contact.number}
              onChange={handleForm}
              placeholder="Phone number *"
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <textarea
              placeholder="Your request *"
              value={contact.message}
              onChange={handleForm}
              name='message'
              rows="5"
              className="w-full p-3 border border-gray-300 rounded"
              required
            ></textarea>
            <button
              type="submit"
              className={`btn  text-blue-700 px-6 py-3 rounded hover:bg-blue-700 hover:text-white ${(!contact.email && !contact.message && !contact.name && !contact.phone) && `text-gray-500 cursor-not-allowed`} `}
              disabled={!contact.email && !contact.message && !contact.name && !contact.phone}
            >
              Send request
            </button>
          </form>
          <p className="text-xs mt-3 text-gray-500">
            We Value Your Business-Related Messages for support, and other questions.
          </p>
        </div>
      </div>
    </div>
  );
};
