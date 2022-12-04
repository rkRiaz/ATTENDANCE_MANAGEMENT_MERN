const config = require('config')
// const cloudinary = require("cloudinary").v2;
const cloudinary = require("cloudinary");
const path = require("path"); 

cloudinary.config({
  cloud_name: config.get('CLOUD_NAME'),
  api_key: config.get('API_KEY'),
  api_secret: config.get('API_SECRET'),
}); 


exports.uploads = (file, folder) => {
  let ext = path.extname(file);
  return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({
        id: result.public_id+ext
      })
    }, {
      resource_type: 'auto',
      folder: folder
    })
  })
}

// module.exports = cloudinary;