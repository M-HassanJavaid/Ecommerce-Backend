const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookeParser = require('cookie-parser')
dotenv.config()
const PORT = process.env.PORT || 3000;
const { connectToDb } = require('./config/db.js')

//Route handlers
const { signup } = require('./routeHandlers/signup.js')
const { login } = require('./routeHandlers/login.js')
const { addProduct } = require('./routeHandlers/addProduct.js')

// Middleware
app.use(express.json());
app.use(cookeParser());


// Routes
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.post('/signup' , signup);
app.post('/login' , login);
app.post('/addProduct' , addProduct);

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