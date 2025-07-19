// const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");

// // Create storage engine
// export function upload() {
//   const mongodbUrl = process.env.MongoDB_URL
//   const storage = new GridFsStorage({
//     url: mongodbUrl,
//     file: (req, file) => {
//       return new Promise((resolve, _reject) => {
//         const fileInfo = {
//           filename: file.originalname,
//           bucketName: "pdfBucket",
//         };
//         resolve(fileInfo);
//       });
//     },
//   });

//   return multer({ storage });
// }

// module.exports = { upload };