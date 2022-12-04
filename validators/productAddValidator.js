const Product = require('../models/Product')
const { body } = require('express-validator')

// const form = formidable({ multiples: true });
// form.keepExtensions = true;
// //Parses an incoming node.js request containing form data
// form.parse(req, async (err, fields, files) => {

// })


const productAddValidator = [

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

module.exports = productAddValidator

