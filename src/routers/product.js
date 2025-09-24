const express = require('express')
const { Product } = require('../model/product.js')

const productRouter = express.Router();


productRouter.post('/add' , async (req , res) => {
    try {
        let { name, description, price } = req.body;
        price = price?.trim() === "" ? NaN : Number(price)
        console.log(name, description, price)

        if (!name || !description || isNaN(price) || price < 0) {
            res.status(400).send({ 
                ok: true,
                message: "Invalid product details!"
            });
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
        });

    } catch (error) {
        res.status(501).send({
            ok: false,
            message: error.message
        })
    }
});

productRouter.get('/all' , async (req , res)=>{
    try {
        let allProducts = await Product.find();
        res.status(200).send({
            ok: true,
            message: "You have successfully recieved all products.",
            products: allProducts
        });
    } catch (error) {
        res.status(501).send({
            ok: false,
            message: "Due to some internal server error, products could not send."
        })
    }
});

productRouter.get('/:id' , async (req , res) => {
    try {
        let id = req.params.id;
        let product = await Product.findById(id);

        if (!product) {
            res.send({
                ok: false,
                message: 'Product not found.'
            });
            return
        }
        
        res.send({
            ok: true,
            message: 'Your asked product has send.',
            product: product
        })
    } catch (error) {
        res.send({
            ok: false,
            message: 'due to some internal server error, product could not send.'
        })
    }
});

productRouter.put('/update/:id' , async (req , res) => {
    try {
        let id = req.params.id;
        let updates = req.body;

        if (!updates) {
            res.send({
                ok: false,
                message: 'You did not update anything.'
            })
        }

        if (updates.price && !(typeof updates.price === Number)) {
            let { price } = updates;
            price = price.trim() === "" ? NaN : Number(price);
            updates.price = price;
            console.log(price)
        }


        if (updates.price < 0 || isNaN(updates.price)) {
            res.send({
                ok: false,
                message: 'product price is inavalid!'
            });
            return;
        }
        
        let updateAble = ['name' , 'description' , 'price'];
        
        let isUpdateAble = Object.keys(updates).every(key => updateAble.includes(key));
        
        if (!isUpdateAble) {
            res.send({
                ok: false,
                message: 'Inavlid Updation.'
            });
            return
        }
        
        let product = await Product.findByIdAndUpdate(id , updates , {
            new: true,
            returnDocument: 'after',
            runValidators: true
        });
        
        if (!product) {
            res.send({
                ok: false,
                message: 'Product not found.'
            });
            return
        }

        res.send({
            ok: true,
            message: 'product has successfully updated.',
            product: product
        })


    } catch (error) {
        
        res.status(500).send({
            ok: false,
            message: error.message
        })

    }
})

productRouter.delete('/delete/:id' , async (req , res) => {
    try {
        let id = req.params.id;

        let deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            res.send({
                ok: false, 
                message: 'Product not found'
            });
            return
        }

        res.send({
            ok: true,
            message: 'Product has successfully deleted',
            product: deletedProduct
        })
        
    } catch (error) {

        res.status(500).send({
            ok: true,
            message: "due to some internal error product could not delete."
        })

    }

})

module.exports = {
    productRouter
}