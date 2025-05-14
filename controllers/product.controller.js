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

async function getProductById(req, res) {
    try {
        const productID = req.params.id;
        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).send({
                message: "Producto no encontrado"
            });
        }

        return res.status(200).send({
            message: "Producto encontrado",
            product
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error al obtener el producto"
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const productID = req.params.id;
        const product = await Product.findByIdAndDelete(productID);

        if (!product) {
            return res.status(404).send({
                message: "Producto no encontrado"
            });
        }

        return res.status(200).send({
            message: "Producto eliminado correctamente",
            product
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error al eliminar el producto"
        });
    }
}

async function updateProduct(req, res) {
    try {
        const productID = req.params.id;
        const product = await Product.findByIdAndUpdate(productID, req.body, { new: true });
        if (!product) {
            return res.status(404).send({
                message: "Producto no encontrado"
            });
        }

        return res.status(200).send({
            message: "Producto actualizado correctamente",
            product
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error al actualizar el producto"
        });
    }
}


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct
}
