
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


module.exports = {
    delImg
}