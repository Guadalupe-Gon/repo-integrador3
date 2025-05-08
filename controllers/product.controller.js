const Product = require("../models/product.model");




async function createProduct(req, res) {

    try {

        const product = new Product(req.body);

        if (req.file) {
            product.image = req.file.filename;
        }

        const newProduct = await product.save();

        return res.status(201).send({
            message: "Producto creado correctamente",
            product: newProduct
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error al crear el producto"
        });
    }
}


async function getProducts(req, res) {

    try {

        const page = req.query.page -1 || 0;
        const limit = req.query.limit || 10;

        const products = await Product.find({})
                                        .sort({ createdAt: -1 })
                                        .limit(limit)
                                        .skip(page * limit);

        return res.status(200).send({
            message: "Productos obtenidos correctamente",
            products
        });
    }

    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error al obtener los productos"
        });
    }
    
}


function getProductById(req, res) {
    const productID = req.params.id;
    res.send(`Producto con ID: ${productID}`);
}


function deleteProduct(req, res) {
    const productID = req.params.id;
    res.send(`Producto con ID: ${productID} eliminado`);
}

function updateProduct(req, res) {
    const productID = req.params.id;
    res.send(`Producto con ID: ${productID} actualizado`);
}





module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
}
