require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const cors = require('cors');

const conectarMongo = require('./DataBase/MongooseConfig.js');
const autenticacionRouter = require('./routes/AutenticacionRoute.js');
const PublicacionRouter = require('./routes/PublicacionRoutes.js');


const app = express();
const PORT = process.env.PORT;


// Midleware //
app.use(cors());
app.use(bodyParser.json());
app.use(fileupload());

// RUTAS //
app.use(PublicacionRouter);
app.use(autenticacionRouter);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    conectarMongo();
});