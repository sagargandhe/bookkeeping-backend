// utils/cloudinary.js
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dtjrq0104',  
  api_key: 122227754581121,        
  api_secret: 'pLfQRv72r1Nv6XcLQu0ozkwmchI',  
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'books',  
    allowedFormats: ['jpg', 'png'],  
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
