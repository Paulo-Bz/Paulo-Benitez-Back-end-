const mongoose = require('mongoose');

const mongoDbUri = process.env.MONGO_DB_URI;


const conectarMongo = async () => {
    try {
        console.log('Conectando..'),
            await mongoose.connect(mongoDbUri),
            console.log('exito')
    } catch (error) {
        console.log('error: ', error)
    }
}


module.exports = conectarMongo;