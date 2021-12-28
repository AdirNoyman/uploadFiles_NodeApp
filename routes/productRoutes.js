const express = require('express');
const router = express.Router();

const {
	createProduct,
	getAllProducts,
} = require('../controllers/productController');
const {
	uploadProductImage,
	uploadProductImageToCloudinary,
} = require('../controllers/uploadsController');

router.route('/').post(createProduct).get(getAllProducts);
router.route('/uploads').post(uploadProductImageToCloudinary);

module.exports = router;
