const express = require("express");
const router = express.Router();

// initializing products controller

const productsController = require("../controller/product_controller");

// to get all the products
router.get("/", productsController.products);

// to create a product
router.post("/create", productsController.create);

// to delete a product using it's ID
router.delete("/:productID", productsController.delete);

// to update the quantity of a product
// router.post("/:productID/update_quantity/", productsController.updateQunatity);


router.post('/:productID/update_quantity', async function(req, res) {
    try {
        const ID = req.params.productID;
        const foundProduct = await Product.findById(ID);
        if (!foundProduct) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        const newQty = parseInt(foundProduct.quantity) + parseInt(req.query.number);
        foundProduct.quantity = newQty;
        await foundProduct.save();

        res.send({
            product: foundProduct,
            message: 'Updated successfully'
        });
    } catch (err) {
        res.status(500).send(err);
    }
});
module.exports = router;
