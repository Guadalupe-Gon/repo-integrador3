const Order = require('../models/order.model');
const Product = require('../models/product.model');


async function createOrder(req, res) {
    try {
        const data = req.body;
        const order = new Order(data);

        await checkOrderPrices(order.products);

        const newOrder = await order.save();

        return res.status(201).send({
            message: "Orden creada exitosamente",
            order: newOrder
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Error al crear la orden"
        });
    }
}

async function checkOrderPrices(products) {
    for (const product of products) {
        const productDB = await Product.findById(product.product);
        
        if (!productDB) {
            throw new Error(`El producto con ID ${product.product} no existe`);
        }
        if (productDB.price !== product.price) {
            throw new Error(`El precio del producto ${productDB.name} no coincide con el precio de la orden`);
        }
    }
}

async function getOrders(req, res) {
    try {
        const id = req.user._id;
        const user = req.user.role === 'admin' ? {} : {user: id};
        
        const orders = await Order.find({user})
            .sort({ createdAt: -1 })
            .populate('user', 'name email')
            .populate('products.product', 'name price image')

        return res.status(200).send({
            message: "Órdenes obtenidas exitosamente",
            orders: orders
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener las órdenes");
    }
}


module.exports = {
    createOrder,
    checkOrderPrices,
    getOrders
};
