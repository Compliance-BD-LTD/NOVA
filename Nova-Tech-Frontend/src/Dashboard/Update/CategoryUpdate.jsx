import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router';
import Swal from 'sweetalert2';

export const UpdateCategory = ({ item }) => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [imagePreview, setImagePreview] = useState(null); // 🔧 Shows either existing or new image
    const [loading, setLoading] = useState(false);
    const { setCategories } = useOutletContext();
    const fileInputRef = useRef();

    useEffect(() => {
        if (item) {
            setName(item.name || '');
            setImagePreview(item.imageUrl || null); // 🔧 Show existing image on open
            setFile(null); // 🔧 Clear file selection when modal re-opens
        }
    }, [item]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile)); // 🔧 Show new image
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            Swal.fire({ icon: "error", title: "Missing Name" });
            return;
        }

        const formData = new FormData();
        if (file) formData.append('image', file); // 🔧 Only if new image selected
        formData.append('name', name);

        setLoading(true);

        try {
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updateCategory/${item._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            Swal.fire({ icon: "success", title: "Updated Successfully" });

            // Reset after successful update
            setName('');
            setFile(null);
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = null;
            setCategories(res.data?.data);
        } catch (err) {
            Swal.fire({ icon: "error", title: "Error updating", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        // Reset state when modal closes
        setName(item?.name || '');
        setImagePreview(item?.imageUrl || null);
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    if (!item) return null;

    return (
        <div>
            <input type="checkbox" id={`updateCategory-${item.name}`} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    {/* Close Button */}
                    <label
                        htmlFor={`updateCategory-${item.name}`}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={handleModalClose}
                    >
                        ✕
                    </label>

                    <section className="space-y-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-2 border-gray-300 p-2 w-full"
                            placeholder="Enter Category Name"
                        />

                        {/* Preview Image */}
                        {imagePreview && (
                            <div className="w-32 h-32 border rounded overflow-hidden">
                                <img loading="lazy" src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="border p-2 w-full"
                            accept="image/*"
                        />

                        <button onClick={handleSubmit} className="btn btn-secondary w-full">
                            Update {loading && <span className="loading loading-spinner loading-sm ml-2"></span>}
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};
