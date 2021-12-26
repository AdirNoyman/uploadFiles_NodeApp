const { StatusCodes } = require('http-status-codes');
const path = require('path');
// upload image
const uploadProductImage = async (req, res) => {
	// Storing the image on the server
	const productImage = req.files.image;

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

module.exports = { uploadProductImage };
