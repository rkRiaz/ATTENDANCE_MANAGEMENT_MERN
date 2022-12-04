const router = require('express').Router()
const upload = require('../middlewares/multer')
const {productImgsUpload, categoryImageUpload, subcategoryImageUpload, brandImageUpload} = require('../controllers/upload')

router.post('/product-imgs/:id', upload.array('product_images', 5), productImgsUpload)
router.post('/category-image/:_id', upload.single('category_image'), categoryImageUpload)
router.post('/subcategory-image/:_id', upload.single('subcategory_image'), subcategoryImageUpload)
router.post('/brand-image/:_id', upload.single('brand_image'), brandImageUpload)




module.exports = router

