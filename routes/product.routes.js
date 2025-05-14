const router = require("express").Router();
const productController = require("../controllers/product.controller");
const upload = require("../middlewares/uploadFile");


router.get("/products", productController.getProducts)

router.get("/products/:id", productController.getProductById)

router.post("/products", [upload], productController.createProduct)

router.delete("/products/:id", productController.deleteProduct)

router.put("/products/:id", productController.updateProduct)


module.exports = router;
