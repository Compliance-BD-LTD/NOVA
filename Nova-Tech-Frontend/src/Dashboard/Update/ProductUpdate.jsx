import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import Swal from 'sweetalert2';
import { capitalizeWords } from '../../Functions/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faXmark } from '@fortawesome/free-solid-svg-icons';

export const ProductUpdate = ({ item }) => {
    const [images, setImages] = useState([]);
    const [pdfs, setPdfs] = useState([{ key: '', file: null }]);
    const [existingPdfs, setExistingPdfs] = useState([]);
    const [removedPdfs, setRemovedPdfs] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [specs, setSpecs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [changed, setChanged] = useState(false);

    const { setCategories, categories, products, setProducts } = useOutletContext();
    const fileInputRef = useRef();

    useEffect(() => {
        if (item && item._id) {
            setImages(item.imageUrl || []);
            setName(item.name || '');
            setModel(item.model || '');
            setDescription(item.description || '');
            setCategory(item.category || '');
            const formattedSpecs = Array.isArray(item.techSpec)
                ? item.techSpec.map(obj => {
                    const key = Object.keys(obj)[0];
                    return { key, value: obj[key] };
                })
                : [];
            setSpecs(formattedSpecs);

            const dbPdfs = item.pdf && typeof item.pdf === 'object' && !Array.isArray(item.pdf)
                ? Object.entries(item.pdf).map(([key, url]) => ({ key, url }))
                : [];
            setExistingPdfs(dbPdfs.length ? dbPdfs : []);
            setPdfs([{ key: '', file: null }]);
            setRemovedPdfs([]);
            setRemovedImages([]);
            setChanged(false);
        }
    }, [item]);

    // Images
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
        setChanged(true);
    };
    const removeImage = (index) => {
        const img = images[index];
        setImages(prev => prev.filter((_, i) => i !== index));
        if (typeof img === 'string') setRemovedImages(prev => [...prev, img]);
        setChanged(true);
    };

    // Specs
    const handleSpecChange = (index, field, value) => {
        const updatedSpecs = [...specs];
        updatedSpecs[index][field] = value;
        setSpecs(updatedSpecs);
        setChanged(true);
    };
    const addSpecField = () => {
        setSpecs(prev => [...prev, { key: '', value: '' }]);
        setChanged(true);
    };
    const removeSpecField = (index) => {
        setSpecs(prev => prev.filter((_, i) => i !== index));
        setChanged(true);
    };

    // PDFs
    const handlePdfFieldChange = (idx, field, value) => {
        const updated = [...pdfs];
        updated[idx][field] = value;
        setPdfs(updated);
        setChanged(true);
    };
    const addPdfField = () => {
        setPdfs(prev => [...prev, { key: '', file: null }]);
        setChanged(true);
    };
    const removePdfField = (idx) => {
        setPdfs(prev => prev.filter((_, i) => i !== idx));
        setChanged(true);
    };

    const removeExistingPdf = (key) => {
        setRemovedPdfs(prev => [...prev, key]);
        setExistingPdfs(prev => prev.filter(pdf => pdf.key !== key));
        setChanged(true);
    };

    // Submit
    const handleSubmit = async (e) => {
        if (!images.length || !name || !model || !description || !category) {
            Swal.fire({ icon: "error", title: "Missing required fields" });
            return;
        }
        // At least one PDF (either new or existing) must remain
        const totalPdfs = existingPdfs.length + pdfs.filter(p => p.key && p.file).length;
        if (totalPdfs < 1) {
            Swal.fire({ icon: "error", title: "At least one PDF is required." });
            return;
        }
        const formData = new FormData();

        // Images
        images.forEach(img => {
            if (typeof img === 'string') {
                formData.append('existingImages', img);
            } else {
                formData.append('images', img);
            }
        });
        if (removedImages.length) {
            formData.append('removedImages', JSON.stringify(removedImages));
        }

        // PDFs: new uploads
        pdfs.forEach(pdf => {
            if (pdf.key && pdf.file) {
                formData.append(`pdf_${pdf.key}`, pdf.file);
            }
        });

        // PDFs: existing (to keep)
        if (existingPdfs.length) {
            formData.append('existingPdfs', JSON.stringify(existingPdfs));
        }
        // PDFs: removed (to delete)
        if (removedPdfs.length) {
            formData.append('removedPdfs', JSON.stringify(removedPdfs));
        }

        // Tech specs
        const transformedSpecs = specs
            .filter(({ key, value }) => key && value)
            .map(({ key, value }) => ({ [key]: value }));

        const info = {
            name,
            model,
            description,
            category,
            techSpec: transformedSpecs
        };

        formData.append('info', JSON.stringify(info));
        setLoading(true);

        try {
            const res = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/updateProduct/${item._id}`,
                formData
            );
            if (res.status === 200) {
                setProducts(res.data.data);
                document.getElementById(`ProductUpdate-${item?._id}`).checked = false
                Swal.fire({ icon: "success", title: "Updated Successfully" });
            }
        } catch (err) {
            Swal.fire({ icon: "error", title: "Error updating", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    if (!item) {
        return (
            <div className='w-full h-full flex justify-center items-center'>
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    const hanldeClose = () => {
        setImages(item.imageUrl || []);
        setName(item.name || '');
        setModel(item.model || '');
        setDescription(item.description || '');
        setCategory(item.category || '');
        setSpecs(item.techSpec || []);
        const dbPdfs = item.pdf && typeof item.pdf === 'object' && !Array.isArray(item.pdf)
            ? Object.entries(item.pdf).map(([key, url]) => ({ key, url }))
            : [];
        setExistingPdfs(dbPdfs.length ? dbPdfs : []);
        setRemovedPdfs([]);
        setRemovedImages([]);
        setPdfs([{ key: '', file: null }]);
        setChanged(false);
        document.getElementById(`ProductUpdate-${item?._id}`).checked = false
    }

    // Disable submit if not changed, loading, or no PDFs remain
    const disableSubmit = loading || !changed || (existingPdfs.length + pdfs.filter(p => p.key && p.file).length < 1);

    return (
        <div>
            <input type="checkbox" id={`ProductUpdate-${item?._id}`} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box relative">
                    <div className="modal-action absolute -top-6 right-4 cursor-pointer" onClick={hanldeClose}>
                        <FontAwesomeIcon icon={faXmark} size='lg' />
                    </div>
                    <section className='space-y-4'>
                        <input value={model} onChange={(e) => { setModel(e.target.value); setChanged(true); }} className='border p-2 w-full' placeholder='Model Name' />
                        <input value={name} onChange={(e) => { setName(e.target.value); setChanged(true); }} className='border p-2 w-full' placeholder='Product Name' />
                        <input value={description} onChange={(e) => { setDescription(e.target.value); setChanged(true); }} className='border p-2 w-full' placeholder='Description' />

                        <select value={category} onChange={(e) => { setCategory(e.target.value); setChanged(true); }} className='border p-2 w-full'>
                            <option disabled value=''>Select Category</option>
                            {categories && categories.map((cat, i) => (
                                <option key={i} value={cat.name}>{capitalizeWords(cat.name)}</option>
                            ))}
                        </select>

                        {/* Tech Specs */}
                        <div className='space-y-2'>
                            {specs.map((spec, i) => (
                                <div key={i} className='flex space-x-2 items-center'>
                                    <input value={spec.key} onChange={(e) => handleSpecChange(i, 'key', e.target.value)} className='border p-2 w-1/2' placeholder='Spec Key' />
                                    <input value={spec.value} onChange={(e) => handleSpecChange(i, 'value', e.target.value)} className='border p-2 w-1/2' placeholder='Spec Value' />
                                    <button type="button" onClick={() => removeSpecField(i)} className='btn btn-sm btn-error'>−</button>
                                </div>
                            ))}
                            <button type="button" className='btn btn-sm btn-primary' onClick={addSpecField}>+ Add Spec</button>
                        </div>

                        {/* Image Previews */}
                        <div className="flex flex-wrap gap-2">
                            {images.map((img, i) => (
                                <div key={i} className="relative">
                                    <img loading="lazy" src={typeof img === 'string' ? img : URL.createObjectURL(img)} className="w-24 h-24 object-cover rounded-md shadow" />
                                    <button type="button" className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1" onClick={() => removeImage(i)}>✕</button>
                                </div>
                            ))}
                        </div>
                        <span>Image</span>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className='border p-2 w-full text-sm  font-light' accept="image/*" multiple />

                        {/* Existing PDFs */}
                        {existingPdfs.length > 0 && (
                            <div>
                                <p className='font-semibold'>Existing PDFs:</p>
                                {existingPdfs.map((pdf, idx) => (
                                    <div className="flex items-center gap-2 mb-1" key={pdf.key} style={{ position: "relative" }}>
                                        <div className='px-4 py-2 rounded-md text-white bg-red-400 cursor-pointer'
                                            onClick={() => window.open(pdf.url, "_blank")}
                                        >
                                            <FontAwesomeIcon icon={faFilePdf} size='sm' />
                                            <span className="ml-2">{pdf.key}</span>
                                        </div>
                                        <button
                                            type="button"
                                            className="hover:text-red-500 text-white rounded-full p-1"
                                            style={{ position: "absolute", right: 0, top: 0 }}
                                            onClick={() => removeExistingPdf(pdf.key)}>
                                            <FontAwesomeIcon icon={faXmark} size="sm" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Dynamic PDF upload fields */}
                        <div>
                            <p className='font-semibold mt-2 mb-1'>Add/Replace PDFs:</p>
                            {pdfs.map((pdf, idx) => (
                                <div key={idx} className="flex items-center gap-2 mb-1">
                                    <input
                                        type="text"
                                        placeholder="PDF Key (e.g. dataSheet)"
                                        value={pdf.key}
                                        onChange={e => handlePdfFieldChange(idx, 'key', e.target.value)}
                                        className="border-2 w-[170px] border-gray-300 p-2"
                                    />
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={e => handlePdfFieldChange(idx, 'file', e.target.files[0])}
                                        className="border-2 border-gray-300 p-2"
                                    />
                                    <button type="button" className="btn btn-sm btn-primary" onClick={addPdfField}>+</button>
                                    <button type="button" className="btn btn-sm btn-error" onClick={() => removePdfField(idx)}>-</button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleSubmit}
                            className={`btn btn-secondary w-full ${disableSubmit ? "opacity-60 cursor-not-allowed" : ""}`}
                            disabled={disableSubmit}
                        >
                            Update {loading && <span className="loading loading-spinner loading-sm ml-2"></span>}
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};