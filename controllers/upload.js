


const fs = require('fs')





// exports.productImgsUpload = async(req, res, next) => {

//     try{
//         const uploader = async (path) => await cloudinary.uploads(path, 'projects/ecommerce/product_images')

//         const images_id = []
    
//         const files = req.files
    
//         for(const file of files) {
//           const path = file.path
//           const newPath = await uploader(path)
//           images_id.push(newPath)
//         }
    
//         res.json(images_id)
        
//     }catch(e) {
//         next(e)
//     }




//    let productImgs = []
//     req.files.map(productImg => {
//         productImgs.push('/' + productImg.filename)
//     }) 
//     res.json(productImgs)
// }



exports.productImgsUpload = async(req, res, next) => {
    try{
        const {id} = req.params
        
        let product = await Product.findOne({_id: id})
 
        let images = req.files.map(file => file.filename)

              
        // images.concat(product.images)

        let concatImages = product.images.concat(images)

        console.log(concatImages)


        let finalProduct = await Product.findOneAndUpdate(
            {_id: id},
            {$set: {'images': concatImages}},
            {new: true}
        )
        return res.status(200).json({message: 'successfully saved', product: finalProduct})
    }

     
    
    catch(e) {
        next(e)
    }
}

exports.categoryImageUpload = async(req, res, next) => {

    try{
        const {_id} = req.params
        let category = await Category.findOne({_id})

        
        if(req.file) {
            if(category.image) {
                console.log(category.image)
                fs.unlink(`public/uploads/images/category/${category.image}`, async err => {
                    if(err) return res.status(500).json(err)
                    let c = await Category.findOneAndUpdate({_id}, {$set: {'image': req.file.filename}}, {new: true})
                    return res.status(200).json({
                        message: `image updated ${category.image}`,
                        category: c
                    })
                })
            } else {
                let finalCategory = await Category.findOneAndUpdate(
                    {_id},
                    {$set: {'image': req.file.filename}},
                    {new: true}
                )
                return res.status(200).json({
                    message: `Successfully uploaded ${finalCategory.image}`, 
                    category: finalCategory
                })
            }
        } else {
            return res.status(200).json({
                message: `Successfully updated`, 
                category: category

            })
        } 
    }

    catch(e) {
        next(e)
    }
}

exports.subcategoryImageUpload = async(req, res, next) => {

    try{
        const {_id} = req.params
        let subcategory = await Subcategory.findOne({_id})

        
        if(req.file) {
            if(subcategory.image) {
                console.log(subcategory.image)
                fs.unlink(`public/uploads/images/subcategory/${subcategory.image}`, async err => {
                    if(err) return res.status(500).json(err)
                    let subc = await Subcategory.findOneAndUpdate({_id}, {$set: {'image': req.file.filename}}, {new: true})
                    return res.status(200).json({
                        message: `image updated ${subcategory.image}`,
                        subcategory: subc
                    })
                })
            } else {
                let finalSubcategory = await Subcategory.findOneAndUpdate(
                    {_id},
                    {$set: {'image': req.file.filename}},
                    {new: true}
                )
                return res.status(200).json({
                    message: `Successfully uploaded ${finalSubcategory.image}`, 
                    subcategory: finalSubcategory
                })
            }
        } else {
            return res.status(200).json({
                message: `Successfully updated`, 
                subcategory: subcategory

            })
        } 
    }

    catch(e) {
        next(e)
    }
}



exports.brandImageUpload = async(req, res, next) => {
    try{
        const {_id} = req.params
        let brand = await Brand.findOne({_id})

        if(req.file) {
            if(brand.image) {
                fs.unlink(`public/uploads/images/brand/${brand.image}`, async err => {
                    if(err) return res.status(500).json(err)
                    let br = await Brand.findOneAndUpdate({_id}, {$set: {'image': req.file.filename}}, {new: true})
                    return res.status(200).json({
                        message: `image updated ${brand.image}`,
                        brand: br
                    })
                })
            } else {
                let finalBrand = await Brand.findOneAndUpdate(
                    {_id},
                    {$set: {'image': req.file.filename}},
                    {new: true}
                )
                return res.status(200).json({
                    message: `Successfully uploaded ${finalBrand.image}`, 
                    brand: finalBrand
                })
            }
        } else {
            return res.status(200).json({
                message: `Successfully updated`, 
                brand: brand
            })
        } 
    }

    catch(e) {
        next(e)
    }
}