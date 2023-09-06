// Assuming you have a Product model defined
const Product = require("../model/product");

// function to show all the products
module.exports.products = function (req, res) {
  Product.find({})
    .then((foundProducts) => {
      res.send(foundProducts);
    })
    .catch((err) => {
      res.send(err);
    });
};

// Define your controller function
exports.create = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
    description: req.body.description,
    price: req.body.price,
  });

  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Product created successfully",
        product: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// function to delete a product using its ID
module.exports.delete = function (req, res) {
  Product.deleteOne({ _id: req.params.productID })
    .then(() => {
      res.send({
        message: "Product deleted",
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// FUnction TO update a product's QUantity

exports.updateQunatity = function (req, res) {
  const ID = req.params.productID;
  Product.findById(ID, function(err, found) {
    if (err) {
        res.send(err);
    } else {
        // Note - To increment the quantity of the product, put a positive number in the query,
        //        and to decrement the quantity, put a negative number in the query.
        const newQty = parseInt(found.quantity) + parseInt(req.query.number);
        // Update the product's quantity
        Product.findByIdAndUpdate(ID, { quantity: newQty }, function(err, updatedProduct) {
            if (err) {
                res.send(err);
            } else {
                updatedProduct.quantity = newQty;
                res.send({
                    product: updatedProduct,
                    message: 'Updated successfully'
                });
            }
        });
    }
});
};
