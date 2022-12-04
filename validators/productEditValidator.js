const { body } = require('express-validator')

const productEditValidator = [
    
        body('name')
        .not().isEmpty().withMessage('Product Name Required'),
        body('slug')
        .not().isEmpty().withMessage('Product Slug Required'),
        // body('category_id')
        // .not().isEmpty().withMessage('Product Category Slug Required'),
        // body('subcategory_id')
        // .not().isEmpty().withMessage('Product Sub Category Slug Required'),
        // body('regular_price')
        // .not().isEmpty().withMessage('Product Regular Price Required'),
        body('sale_price')
        .not().isEmpty().withMessage('Product Sale Price Required'),
        // body('product_code')
        // .not().isEmpty().withMessage('Product Code Required'),
        // body('amount')
        // .not().isEmpty().withMessage('Please Enter Product Quantity'),

]

module.exports = productEditValidator

