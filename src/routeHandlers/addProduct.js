const { Product } = require('../model/product.js')
const validator = require('validator')

async function addProduct(req, res) {
    try {
        let { name, description, price } = req.body;
        price = Number(price)
        console.log(name, description, price)

        if (!name || !description) {
            res.status(400).send({ message: "Name and description are required" });
            return
        }

        if (isNaN(price) || price < 0) {
            res.status(400).send({ message: "Price must be a valid positive number" });
            return
        }

        let newProduct = new Product({
            name,
            description,
            price
        });

        let savedProduct = await newProduct.save();

        res.send({
            ok: true,
            message: 'Product has successfully added.',
            product: savedProduct
        })
    } catch (error) {
        res.status(501).send({
            ok: false,
            message: error.message
        })
    }
}

module.exports = {
    addProduct
}