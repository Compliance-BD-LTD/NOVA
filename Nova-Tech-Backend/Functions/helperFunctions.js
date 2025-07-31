
const { cloudinary } = require("../Cloudinary/cloudinary");
const { extractPublicId } = require("cloudinary-build-url");
const delImg = async (imageUrl) => {

    let publicKey = []
    imageUrl.forEach(url => {
        const publicId = extractPublicId(url)
        publicKey.push(publicId)
    });

    await cloudinary.api.delete_resources(publicKey, (error, result) => {
        if (error) {
            return false
        }

    }
    )
    return true



}

// deleteImage(['https://res.cloudinary.com/des05ruq7/image/upload/v1753681284/r0aqj9ahdfnxkkosup3e.pdf'])

module.exports = {
    delImg
}