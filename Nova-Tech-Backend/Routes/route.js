const express = require('express')
const { getProducts, addProduct, deleteProduct, getCategories, addCategory, deleteCategory, updateProduct, updateCategory, downloadPdfFiles, getLogo, pdfUpload, uploadBanner, getBanners, deleteBanner, deleteCertificate, deleteCatalogue, deleteBlog, AddBlog, addCertificate, addCatalogue, getCertificate, getBlogs, getCatalogue } = require('../Controller/Controller')
const { register, login } = require('../Controller/AuthController')
const router = express.Router()
const multer = require('multer')
const { uploadLogo, getQueries, UploadPdf } = require('../Controller/AdminController')

const upload = multer({ dest: 'uploads/' })

// __________Api testing Route______________
router.get('/', (req, res) => {
    res.send('The Server Is Working')
})
// _________API testing Route___________


router.get('/getProducts', getProducts)
router.get('/getCategories', getCategories)
router.get('/getLogo', getLogo)
router.get('/getBanners',getBanners)
router.get('/getCertificate', getCertificate)
router.get('/getBlogs', getBlogs)
router.get('/getCatalogue', getCatalogue)
// _________Admin route________________
router.post('/register', register)
router.post('/login', login)
router.post('/addBlog', upload.fields([
    { name: 'images' }
]), AddBlog)
router.post('/addCertificate', upload.fields([
    { name: 'image' },
]), addCertificate)
router.post('/addCatalogue',upload.fields([
    {name:'image'},
    {name:'pdf'}
]),addCatalogue)
// router.post('/addProduct', upload.array('images', 5), addProduct);


router.post('/addProduct', upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'pdf', maxCount: 1 }
]), addProduct);
router.put('/updateProduct/:id', upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'pdf', maxCount: 1 }
]), updateProduct)


router.delete('/deleteProduct', deleteProduct)
router.post('/addCategory', upload.single('image'), addCategory)



router.delete('/deleteCategory', deleteCategory)
router.delete('/deleteBanner',deleteBanner)
router.delete('/deleteCertificate', deleteCertificate)
router.delete('/deleteCatalogue',deleteCatalogue)
router.delete('/deleteBlog', deleteBlog)

router.put('/updateCategory/:id', upload.single('image', 5), updateCategory)
router.get('/download/:fileId', downloadPdfFiles)
router.get('/getQueries', getQueries)
router.post('/upload-pdf', UploadPdf)

router.post('/pdf', upload.single('pdf'), pdfUpload)
router.post('/uploadBanner',upload.array('images',10),uploadBanner)

router.post('/logoUpload', upload.array('images', 5), uploadLogo)
module.exports = {
    router
}