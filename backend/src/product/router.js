const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.post("/add_product", controller.addProduct);
router.get("/get_product/", controller.getProduct);
router.get("/get_product/:id", controller.getProductById);
router.put("/update_product/:id", controller.updateProduct);


module.exports = router;