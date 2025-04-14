// utils/cloudinary.js
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary Config
cloudinary.config({
  cloud_name: 'dtjrq0104',  // Yeh tumhe Cloudinary se lena padega
  api_key: 122227754581121,        // Yeh tumhe Cloudinary se lena padega
  api_secret: 'pLfQRv72r1Nv6XcLQu0ozkwmchI',  // Yeh tumhe Cloudinary se lena padega
});

// Multer Storage Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'books',  // Yeh tumhare Cloudinary account me 'books' naam ka folder create karega
    allowedFormats: ['jpg', 'png'],  // Yeh format ki files allowed hain
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
