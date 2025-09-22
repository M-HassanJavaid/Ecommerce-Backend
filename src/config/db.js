const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()


async function connectToDb() {
    let mongoUri = process.env.MONGO_URI;
    try {
        mongoose.connect(mongoUri);
        console.log('Database has connected!')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    connectToDb
}