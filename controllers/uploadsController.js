const { StatusCodes } = require('http-status-codes');
const path = require('path');
// use cloudinary's version 2
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
// imports index.js from the errors folder because it's the default file to export
const CustomError = require('../errors');

// upload image from local repo
const uploadProductImage = async (req, res) => {
	// check if files exists in the request
	// check files format
	// check file size

	console.log(req.files);

	// Check if the request has a file in it
	if (!req.files) {
		throw new CustomError.BadRequestError('No file uploaded 😥');
	}

	// Storing the image on the server
	const productImage = req.files.image;

	// Check if the request has a file type image
	if (!productImage.mimetype.startsWith('image')) {
		throw new CustomError.BadRequestError('Please upload an image 😡');
	}

	// Check if the request has a file in the apporiate size
	const maxSize = 100000;
	if (productImage.size > maxSize) {
		throw new CustomError.BadRequestError(
			'Please upload image smaller than 1KB 😬'
		);
	}

	// Constructing the path to where the image will be saved to
	const imagePath = path.join(
		__dirname,
		`../public/uploads/${productImage.name}`
	);
	// Moving the image to the path
	await productImage.mv(imagePath);
	return res
		.status(StatusCodes.OK)
		.json({ image: { src: `/uploads/${productImage.name}` } });
};

// upload image to cloudinary
const uploadProductImageToCloudinary = async (req, res) => {
	const result = await cloudinary.uploader.upload(
		req.files.image.tempFilePath,
		{ use_filename: true, folder: 'file-upload' }
	);

	// clear the tempFilePath folder in our server
	fs.unlinkSync(req.files.image.tempFilePath);
	return res
		.status(StatusCodes.OK)
		.json({ image: { src: result.secure_url } });
};

module.exports = { uploadProductImage, uploadProductImageToCloudinary };
