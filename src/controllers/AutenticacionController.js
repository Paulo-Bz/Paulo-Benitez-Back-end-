const jwt = require('jsonwebtoken');
const PublicacionModel = require('./../models/PublicacionModel');

const AutenticacionController = {}
const JWT_KEY = process.env.JWT_KEY;

AutenticacionController.autenticar = async (req, res) => {
    try {
        const { titulo, contenido, autor } = req.body;
        const PublicacionEncontrado = await PublicacionModel.findOne({
            titulo: titulo,
            contenido: contenido,
            autor: autor,
        });

        if (!PublicacionEncontrado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' })
        }

        const datos = {

            titulo: tituloEncontrado.titulo,
            contenido: contenidoEncontrado.contenido,
            autor: autorEncontrado.autor,

        }

        let token = jwt.sign(datos, JWT_KEY);     //{ expiresIn: '1h' } para que dure solo un tiempo el token..

        res.json({ token: token, datos: datos })

    } catch (error) {
        return res.status(500).json({ mensaje: 'Ocurrio un error' })
    }
}

/*AutenticacionController.registrar = (req, res) => {
}*/

AutenticacionController.verificarToken = (req, res) => {
    const token = req.body.token;

    try {
        let desencriptado = jwt.verify(token, JWT_KEY);

        res.json({ datos: desencriptado })

    } catch (error) {

        res.status(500).json({
            mensaje: 'Ocurrio un error',
            error: error,
        });
    }
}

module.exports = AutenticacionController;