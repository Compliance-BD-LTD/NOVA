import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useOutletContext } from 'react-router';
import Swal from 'sweetalert2';

export const ImageModal = () => {
    const [File, setFile] = useState(null)
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const setCategories = useOutletContext().setCategories
    const fileInputRef = useRef();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            const path = URL.createObjectURL(file)
            setFile(file)

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops Image Couldnt Select...",
                text: "Something went wrong!",

            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!File || !name) {
            Swal.fire({
                icon: "error",
                title: "Missing File or Name",
            });
            return;
        }

        const formData = new FormData();
        formData.append('image', File);  // ✅ Matches multer.single('image')
        formData.append('name', name);   // ✅ Must match req.body.name

        // Log form data to debug
        setLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addCategory`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            Swal.fire({
                icon: "success",
                title: "Uploaded Successfully",
            });

            setFile(null);
            setName('');
            fileInputRef.current.value = null;  // reset file input
            setCategories(res.data?.data);

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error uploading",
                text: err.message
            });
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>
            <input type="checkbox" id="my_modal_3" className="modal-toggle" />

            {/* Modal Box */}
            <div className="modal">
                <div className="modal-box relative">
                    {/* Close Button */}
                    <label htmlFor="my_modal_3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </label>

                    <section className='space-y-4'>
                        <div>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='border-2 border-gray-300 p-2 ' placeholder='Enter Category Name' id="" />
                            <input type="file" ref={fileInputRef} id="img" name="img" onChange={handleFileChange} className='borer-1 border-gray-200' accept="image/*" />
                        </div>

                        <button disabled={(!name || !File || loading) && true} onClick={handleSubmit} className='btn btn-secondary'>Upload  {loading && <span className="loading loading-spinner loading-sm"></span>}  </button>

                    </section>




                </div>
            </div>
        </div>
    );
};
