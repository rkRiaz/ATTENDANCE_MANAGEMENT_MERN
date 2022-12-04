const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === 'subcategory_image') {
            cb(null, 'public/uploads/images/subcategory/')
        } else if(file.fieldname === 'category_image') {
            cb(null, 'public/uploads/images/category')
        } else if (file.fieldname === 'product_images') {
            cb(null, 'public/uploads/images/product')
        } else if(file.fieldname === 'brand_image') {
            cb(null, 'public/uploads/images/brand')
        } else {
            cb(null, 'public/uploads/images/other')
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+'-'+Date.now()+'-'+file.originalname)
    }
})

const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 5 * 1024 * 1024
    // },
    fileFilter: (req, file, cb) => {
        const types = /jpeg|jpg|png|gif/
        const extName = types.test(path.extname(file.originalname).toLowerCase())
        const mimeType = types.test(file.mimetype)

        if(extName && mimeType) {
            cb(null, true)
        } else {
            new Error('Only Supports Images')
        }
    } 
})


module.exports = upload

