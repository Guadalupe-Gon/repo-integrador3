const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const { isAuth } = require('../middlewares/isAuth');



router.post('/orders', orderController.createOrder);

router.get('/orders', [isAuth], orderController.getOrders);



module.exports = router;