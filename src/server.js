const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookeParser = require('cookie-parser')
dotenv.config()
const PORT = process.env.PORT || 3000;
const { connectToDb } = require('./config/db.js')

//Routers 
const { authRouter } = require('./routers/auth.js');
const { productRouter } = require('./routers/product.js')
const { userRouter } = require('./routers/user.js')


// Middleware
app.use(express.json());
app.use(cookeParser());

// Routers API
app.use('/auth' , authRouter);
app.use('/product', productRouter);
app.use('/user' , userRouter)



// Routes
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Start server

(async () => {
    try {
        await connectToDb();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error.message)
    }
})()