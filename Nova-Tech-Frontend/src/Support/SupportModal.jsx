import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { socket } from '../Socket/socket';
import Swal from 'sweetalert2';

export const SupportModal = ({ supportTitle }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        contactNumber: "",
        email: "",
        model: "",
        description: "",
    });

    const handleClose = () => {
        document.getElementById('supportModal').checked = false;
        setFormData({
            contactNumber: "",
            email: "",
            model: "",
            description: "",
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            SupportType: supportTitle, // Ensure latest value
            contactNumber: formData.contactNumber,
            email: formData.email,
            model: formData.model,
            description: formData.description,
        };

        socket.emit("support", payload);

        socket.on("insertedSupport", (res) => {
            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: `Your Query got Submitted`,


                });
                setFormData({
                    contactNumber: "",
                    email: "",
                    model: "",
                    description: "",
                });
                handleClose();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Something Error",
                    text: error.message

                });
            }
            setLoading(false);
        });
    };

    return (
        <div>
            <input type="checkbox" id="supportModal" className="modal-toggle" />
            <div className="modal  bg-opacity-50 flex justify-center items-center min-h-screen">
                <div className="modal-box relative p-6 bg-white rounded-lg shadow-lg w-full max-w-lg">
                    {/* Close Button */}
                    <div className="absolute right-3 top-3 cursor-pointer" onClick={handleClose}>
                        <FontAwesomeIcon icon={faXmark} size='lg' className='text-gray-600 hover:text-red-500 transition' />
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Support Request</h2>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={`Support Type: ${supportTitle}`}
                            disabled
                            className="input input-bordered w-full bg-gray-100 text-gray-600"
                        />

                        <input
                            type="text"
                            placeholder="Contact Number"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Model Number"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Problem Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full h-24"
                            required
                        ></textarea>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`btn btn-primary w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};