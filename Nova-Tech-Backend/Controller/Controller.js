const { mongoose } = require("mongoose")
const { cloudinary } = require("../Cloudinary/cloudinary")
const { getGridFSBucket } = require("../Database Connection/DB_Conneection")
// 
const { Categories } = require("../Model/Categories")
const { Products } = require("../Model/Prodcuts")
const { Logo } = require("../Model/logo")
const { Banners } = require("../Model/Banners")
const { Catalogue } = require("../Model/catalogue")
const { Certificates } = require("../Model/certificates")
const { Blogs } = require("../Model/Blogs")
const { delImg } = require('../Functions/HelperFunctions')
const getProducts = async (req, res) => {

    try {
        const data = await Products.find({}).sort({ createdAt: -1 }).lean()
        res.send(data)
    } catch (error) {
        res.send({
            "message": error.message
        })
    }


}
const getLogo = async (req, res) => {
    try {

        const logo = await Logo.find({}).sort({ createdAt: -1 }).limit(1)
        if (logo) {
            res.send({
                data: logo[0].imageUrl
            })

        } else {
            res.status(403).send({
                message: 'No Logo Found'
            })
        }

    } catch (error) {
        res.send({
            "message": error.message
        })
    }
}
const getCategories = async (req, res) => {
    try {
        const data = await Categories.find({}).sort({ createdAt: -1 })
        if (data) {
            res.send(data)
        }

    } catch (error) {
        res.send({
            "message": error.message
        })
    }
}

// __________Add Products_______________________

// const addProduct = async (req, res) => {

//     try {
//         const files = req.files; // multiple files from multer (images[])
//         const infoString = req.body.info;


//         if (!infoString) {
//             return res.status(400).send({ message: "Missing info data" });
//         }

//         const info = JSON.parse(infoString); // parse stringified JSON
//         const imageUrl = [];

//         // Upload each file to Cloudinary
//         for (const file of files) {
//             const result = await cloudinary.uploader.upload(file.path);
//             imageUrl.push(result.secure_url);
//         }

//         info.imageUrl = imageUrl;


//         if (info.name != '' && info.imageUrl != "") {
//             const newProduct = new Products(info);
//             const savedProduct = await newProduct.save();

//             const products = await Products.find({}).sort({ createdAt: -1 }).lean()

//             if (products) {
//                 res.status(200).send({
//                     message: "Product uploaded successfully",
//                     data: products,
//                 });
//             }
//         } else {
//             res.status(500).send({ 'message': 'Multiple Attempt' })
//         }




//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: error.message });
//     }



// }

const addProduct = async (req, res) => {
    try {
        const files = req.files; // multer.fields gives an object: { images: [...], pdf: [...] }
        const infoString = req.body.info;

        if (!infoString) {
            return res.status(400).send({ message: "Missing info data" });
        }

        const info = JSON.parse(infoString);

        const imageFiles = files?.images || [];
        const pdfFile = files?.pdf?.[0] || null;

        // Upload image files
        const imageUrls = await uploadImages(imageFiles); // You must define this
        info.imageUrl = imageUrls;

        // Upload PDF if present
        if (pdfFile) {
            console.log('The PDF File', pdfFile)
            const pdfUrl = await pdfUpload(pdfFile); // You already have this function
            info.pdf = pdfUrl;
            console.log('The PDF file that we got ', pdfUrl)
        }

        // Validate before saving
        if (info.name && info.imageUrl.length > 0) {
            const newProduct = new Products(info);
            await newProduct.save();

            const products = await Products.find({}).sort({ createdAt: -1 }).lean();
            return res.status(200).send({
                message: "Product uploaded successfully",
                data: products,
            });
        } else {
            return res.status(400).send({ message: "Product name or images missing" });
        }
    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).send({ message: error.message });
    }
};



const pdfUpload = async (file) => {

    try {
        const uploadToCloudinary = await cloudinary.uploader.upload(file.path, {
            resource_type: 'raw',
            public_id: `pdfs/${Date.now()}-${file.originalname}`,
            format: 'pdf',
            use_filename: true,
            unique_filename: false,
        });

        if (!(uploadToCloudinary.format === 'pdf')) {
            let url = uploadToCloudinary.secure_url;
            for (let index = url.length - 1; index >= 0; index--) {
                if (url[index] === '.') {
                    return url.slice(0, index) + '.pdf';
                }
            }
        }

        return uploadToCloudinary.secure_url;
    } catch (error) {
        throw new Error(`PDF upload failed: ${error.message}`);
    }


};


const uploadImages = async (files) => {
    const imageUrls = [];
    for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
    }
    return imageUrls;
};

// const addProduct = async (req, res) => {
//     try {
//         const files = req.files;
//         const infoString = req.body.info;

//         if (!infoString) return res.status(400).send({ message: "Missing info data" });

//         const info = JSON.parse(infoString);
//         const imageUrl = [];
//         let pdfId = "";

//         const gfs = getGridFSBucket(); // **Get initialized GridFSBucket**

//         // ✅ Handle image uploads correctly
//         if (files.images) {
//             for (const file of files.images) {
//                 imageUrl.push(`/uploads/${file.filename}`);
//             }
//         }

//         // ✅ Handle PDF upload using GridFS
//         if (files.pdf && files.pdf.length > 0) {
//             const pdfFile = files.pdf[0]; // Since it's an array with 1 element
//             const stream = gfs.openUploadStream(pdfFile.originalname);
//             stream.end(pdfFile.buffer);
//             pdfId = stream.id.toString();
//         }

//         info.imageUrl = imageUrl;
//         info.pdf = pdfId; // Attach PDF GridFS ID to product info

//         const newProduct = new Products(info);
//         await newProduct.save();

//         const products = await Products.find({}).sort({ createdAt: -1 }).lean();
//         return res.status(200).send({
//             message: "Product uploaded successfully!",
//             data: products,
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: error.message });
//     }
// };

const downloadPdfFiles = async (req, res) => {
    try {
        const { fileId } = req.params;
        const gfs = getGridFSBucket();

        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            return res.status(400).json({ message: "Invalid file ID format!" });
        }

        // Fetch file metadata from GridFS
        const fileMetadata = await mongoose.connection.db
            .collection("uploads.files")
            .findOne({ _id: new mongoose.Types.ObjectId(fileId) });

        if (!fileMetadata) {
            return res.status(404).json({ message: "File not found." });
        }

        // Set headers BEFORE piping stream
        res.setHeader("Content-Type", fileMetadata.contentType || "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename="${fileMetadata.filename}"`);

        // Open the download stream
        const downloadStream = gfs.openDownloadStream(new mongoose.Types.ObjectId(fileId));

        downloadStream.on("error", (err) => {
            console.error("Stream error:", err);
            return res.status(500).json({ message: "Error streaming the file." });
        });

        // Pipe the file to the response
        downloadStream.pipe(res);

    } catch (error) {
        console.error("Download error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.hello = (req, res) => {
    res.send('hi')
}


const deleteCatalogue = async (req, res) => {

    const { id } = req.body

    const search = await Catalogue.findOne({ _id: id }).lean()

    if (search) {
        const delImage = await delImg(search.imageUrl)
        const delPdf = search.pdf.length > 0 ? await delImg([search.pdf]) : true

        if (delImage && delPdf) {
            const del = await Catalogue.deleteOne({ _id: id })

            try {
                if (del) {
                    const data = await Catalogue.find({}).sort({ createdAt: -1 }).lean()
                    return res.status(200).send({
                        "message": "Product Deleted Successfully",
                        data: data
                    })
                } else {
                    return res.status(403).send({
                        "message": "Couldn't Delete it"
                    })
                }

            } catch (error) {
                res.send(error.message)
            }
        }

        return res.status(403).send({
            "message": "Couldn't Delete it From Cloud"
        })
    }
    return res.status(403).send({
        "message": "Couldn't Find it"
    })



}

const updateProduct = async (req, res) => {
    try {
        const files = req.files || {};
        const infoString = req.body.info;
        const existingImages = req.body.existingImages || [];

        if (!infoString) {
            return res.status(400).send({ message: "Missing info data" });
        }

        const info = JSON.parse(infoString);

        const imageUrl = [];

        // Handle existing image URLs (from client)
        if (typeof existingImages === 'string') {
            imageUrl.push(existingImages);
        } else if (Array.isArray(existingImages)) {
            imageUrl.push(...existingImages);
        }

        // Upload new images
        if (files.images && files.images.length > 0) {
            for (const file of files.images) {
                const result = await cloudinary.uploader.upload(file.path);
                imageUrl.push(result.secure_url);
            }
        }

        // Upload PDF if provided
        if (files.pdf && files.pdf.length > 0) {
            const pdfFile = files.pdf[0];

            console.log('The PDF', pdfFile)
            const uploadedPdfUrl = await pdfUpload(pdfFile);
            console.log('The PDF Url', uploadedPdfUrl)
            if (uploadedPdfUrl) {
                info.pdf = uploadedPdfUrl;
            }
        }

        // Assign final image list
        info.imageUrl = imageUrl;

        // Validate required fields
        if (!info.name || imageUrl.length === 0) {
            return res.status(400).send({ message: "Missing name or images" });
        }

        // Update the product
        const updatedProduct = await Products.findByIdAndUpdate(
            req.params.id,
            info,
            { new: true }
        );

        const products = await Products.find({}).sort({ createdAt: -1 }).lean();

        return res.status(200).send({
            message: "Product updated successfully",
            data: products,
        });

    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).send({ message: error.message });
    }
};
const fetchBanner = async () => {
    const banners = await Banners.find({}).sort({ createdAt: -1 }).limit(4).lean()
    return banners
}
const getBanners = async (req, res) => {
    try {
        const banners = await fetchBanner()
        if (banners) {
            res.send({
                data: banners
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }

}
const getBlogs = async (req, res) => {
    try {
        const result = await Blogs.find({}).lean()
        if (result) {
            return res.send({

                'data': result
            })
        }
        return res.status(401).send({
            'message': 'Coulndt find data',
        })
    } catch (error) {

    }
}

const getCatalogue = async (req, res) => {
    try {
        const data = await Catalogue.find({}).sort({ createdAt: -1 }).lean()
        if (data) {
            return res.send({
                data: data
            })
        }
        return res.status(404).send({
            message: 'No Catalogue Found'
        })
    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}


const getCertificate = async (req, res) => {
    try {

        const data = await Certificates.find({}).lean()
        if (data) {
            res.send({
                data: data
            })
        }

    } catch (error) {
        res.send({
            "message": error.message
        })
    }


}


const uploadBanner = async (req, res) => {
    console.log('hitted')
    try {
        const info = JSON.parse(req.body.info)
        const files = req.files
        info.imageUrl = await uploadImages(files)

        console.log('imageUrl', info.imageUrl)

        const newBanner = new Banners(info)

        const result = await newBanner.save()

        if (result) {
            const banners = await fetchBanner()
            if (banners) {
                res.send({
                    message: 'Banner Upload Successfully',
                    data: banners
                })
            }

        }


    } catch (error) {
        console.error('Banner upload error:', error);
        res.status(500).send({
            message: error.message
        })
    }


}

const deleteBanner = async (req, res) => {
    try {
        const { id } = req.body

        const result = await Banners.deleteOne({ _id: id })
        if (result) {
            const banners = await fetchBanner()

            res.send({
                message: 'Deleted Successfully',
                data: banners
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

const addCategory = async (req, res) => {
    try {

        const file = req.file
        const name = req.body.name

        const search = await Categories.find({ name: name }).lean()
        if (search.length > 0) {
            return res.send({
                'message': 'This Category Exists'
            })

        }

        const data = {
            name,
            imageUrl: ''
        }

        await cloudinary.uploader.upload(file.path)
            .then((resp) => {
                data.imageUrl = resp.secure_url
            })
            .catch((error) => {


                res.status(401).send({ message: 'Failed to Upload Please Try Again' })

                return
            }
            )

        const addCategory = new Categories(data)
        const result = await addCategory.save()
        const categories = await Categories.find({}).sort({ createdAt: -1 })


        if (result) {
            res.send({
                'message': 'New Categpory Added',
                data: categories

            })
        }

    } catch (error) {
        res.status(500).send({
            'message': error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {

        const { id } = req.body


        const search = await Categories.find({ _id: id }).lean()
        if (search.length > 0) {

            const dlt = await Categories.deleteOne({ _id: id })
            if (dlt) {
                const data = await Categories.find({}).lean()
                return res.send({
                    'message': 'Category Deleted Successfully',
                    data: data
                })
            } else {
                return res.send({
                    'message': 'Couldnt Delete it'
                })
            }

        }
        return res.send({
            'message': 'Category Doesnt Exist'
        })

    } catch (error) {
        res.status(500).send({
            'message': 'Error Deleting Category'
        })
    }
}
const updateCategory = async (req, res) => {
    try {
        const file = req.file; // multer.single('image') should be used in route
        const { name } = req.body;

        if (!name) {
            return res.status(400).send({ message: "Missing category name" });
        }

        let imageUrl = req.body.existingImage; // current image URL (string)

        // If new file is uploaded, replace the image URL
        if (file) {
            const result = await cloudinary.uploader.upload(file.path);
            imageUrl = result.secure_url;
        }

        // Update category
        const updatedCategory = await Categories.findByIdAndUpdate(
            req.params.id,
            { name, imageUrl },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).send({ message: "Category not found" });
        }

        // Fetch updated list
        const allCategories = await Categories.find({}).sort({ createdAt: -1 }).lean();

        return res.status(200).send({
            message: "Category updated successfully",
            data: allCategories,
        });
    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).send({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {

    const { id } = req.body

    const del = await Products.deleteOne({ _id: id })
    try {
        if (del) {
            const data = await Products.find({}).lean()
            res.status(200).send({
                "message": "Product Deleted Successfully",
                data: data
            })
        } else {
            res.status(403).send({
                "message": "Couldn't Delete it"
            })
        }

    } catch (error) {
        res.send(error.message)
    }

}

const deleteBlog = async (req, res) => {

    const { id } = req.body
    const search = await Blogs.findOne({ _id: id }).lean()

    const delImage = await delImg(search.imageUrl)

    if (delImage) {
        const del = await Blogs.deleteOne({ _id: id })
        try {
            if (del) {
                const data = await Blogs.find({}).lean()
                return res.status(200).send({
                    "message": "Product Deleted Successfully",
                    data: data
                })
            } else {
                res.status(403).send({
                    "message": "Couldn't Delete it From Database"
                })
            }

        } catch (error) {
            res.send(error.message)
        }
    } else {
        return res.status(500).send({
            message: "Coundn't delete it from Cloude"
        })
    }



}

const deleteCertificate = async (req, res) => {
    try {

        const { id } = req.body


        const search = await Certificates.find({ _id: id }).lean()





        if (search.length > 0) {

            const delImage = await delImg(search[0].imageUrl)
            console.log('Search', delImg);





            if (!delelteImage) {
                return res.status(401).send({
                    'message': 'Error Deleting Image'
                })
            }
            const dlt = await Certificates.deleteOne({ _id: id })
            if (dlt) {
                const data = await Certificates.find({}).lean()
                return res.send({
                    'message': 'Certificate Deleted Successfully',
                    data: data
                })
            } else {
                return res.send({
                    'message': 'Couldnt Delete it'
                })
            }

        }
        return res.send({
            'message': 'Certificate Doesnt Exist'
        })

    } catch (error) {
        res.status(500).send({
            'message': 'Error Deleting Certificates'
        })
    }
}

const AddBlog = async (req, res) => {
    try {

        const { Info } = req.body
        const info = JSON.parse(Info)

        const files = req.files

        const imageUrl = await uploadImages(files.images)
        info.imageUrl = imageUrl

        const newBlog = new Blogs(info)

        const result = await newBlog.save()

        const AllBlogs = await Blogs.find({}).lean()
        if (result) {
            return res.send({
                'message': 'Uploaded Successfully',
                'data': AllBlogs
            })
        }
        return res.status(401).send({
            'message': 'Uploaded Failed',
            'data': AllBlogs
        })




    } catch (error) {
        return res.status(500).send({
            'message': 'Server Error',

        })
    }
}

const addCertificate = async (req, res) => {
    try {

        const files = req.files
        const name = req.body.name

        const search = await Certificates.find({ name: name }).lean()
        if (search.length > 0) {
            return res.send({
                'message': 'This Certificate Exists'
            })

        }

        const data = {
            name,
            imageUrl: '',

        }
        data.imageUrl = await uploadImages(files.image)




        const addCertificate = new Certificates(data)

        const result = await addCertificate.save()
        const certificates = await Certificates.find({}).sort({ createdAt: -1 })


        if (result) {
            res.send({
                'message': 'New Categpory Added',
                data: certificates

            })
        } else {
            res.status(400).send({
                'message': 'Couldnt Add it',
                data: certificates

            })
        }

    } catch (error) {
        console.log('err', error.message)
        res.status(500).send({
            'message': error.message
        })
    }


}
const addCatalogue = async (req, res) => {


    try {

        const { name } = req.body
        const { image, pdf } = req.files



        if (!name || !image) {
            return res.status(400).send({
                message: 'Name, Image and PDF are required'
            })
        }


        const imageUrl = await uploadImages(image)
        const pdfUrl = (pdf && await pdfUpload(pdf[0])) || ""

        const add = new Catalogue({ name, imageUrl, pdf: pdfUrl })

        const result = await add.save()
        if (result) {

            const catalogues = await Catalogue.find({}).sort({ createdAt: -1 }).lean()

            return res.send({
                message: 'Catalogue Added Successfully',
                data: catalogues
            })
        }

        return res.status(401).send({
            message: 'Error Adding Catalogue'
        })

    } catch (error) {


        console.error("Upload error:", error);
        return res.status(500).send({
            message: error.message
        })
    }
}



module.exports = {
    getBlogs, AddBlog, getCertificate, getCatalogue, addCatalogue, addCertificate, deleteBanner, deleteBlog, deleteCertificate, uploadBanner, deleteCatalogue, getBanners, pdfUpload, getLogo, downloadPdfFiles, getProducts, addProduct, deleteProduct, getCategories, addCategory, deleteCategory, updateProduct, updateCategory
}