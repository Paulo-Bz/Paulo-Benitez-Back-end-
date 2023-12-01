const PublicacionModel = require('../models/PublicacionModel.js');
const { verificarToken } = require('../utils/ClaveToken.js')
const PublicacionController = {};


// VER PUBLICACION //
PublicacionController.verPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const publicacionEncontrado = await PublicacionModel.findById(id);

        return res.json(publicacionEncontrado);
    } catch (error) {
        let mensaje = 'Ocurrió un error';

        if (error.kind === 'ObjectId') {
            mensaje = 'No se pudo obtener la publicacion';
        }
        return res.status(500).json({
            mensaje: mensaje,
            error: error
        });
    }
}


// VER PUBLICACIONES //
PublicacionController.verPublicaciones = async (req, res) => {
    try {
        const listaPublicaciones = await PublicacionModel.find().populate('usuarios');

        return res.json(listaPublicaciones);

    } catch (error) {

        return res.status(500).json({
            mensaje: 'Ocurrió un error',
            error: error
        });
    }
}


// CREAR PUBLICACION //
PublicacionController.crearPublicacion = async (req, res) => {
    try {
        const { titulo, contenido } = req.body;

        const { token } = req.headers;

        const validoToken = verificarToken(token)

        if (!validoToken) {
            return res.status(500).json({
                mensaje: 'ocurrio un error token invalido',
                error: error

            })
        }

        const autor = validoToken.id
        const nuevaPublicacion = new PublicacionModel({
            titulo: titulo,
            contenido: contenido,
            autor: autor,
        });

        await nuevaPublicacion.save();

        return res.json({ mensaje: 'Publicacion creada' })

    } catch (error) {

        return res.status(500).json({
            mensaje: 'Ocurrió un error',
            error: error
        });
    }
}

// EDITAR PUBLICACION //
PublicacionController.editarPublicacion = async (req, res) => {
    try {
        const { id, titulo, contenido } = req.body;

        const { token } = req.headers;

        const validoToken = verificarToken(token)

        if (!validoToken) {
            return res.status(500).json({
                mensaje: 'Token no valido',
                error: error
            });
        }
        const userId = validoToken.id

        const publicacion = await PublicacionModel.findById(id)

        if (publicacion.autor !== userId) {
            return res.status(500).json({
                mensaje: 'Autor equivocado',
                error: error
            })

        }

        await PublicacionModel.findByIdAndUpdate(
            id,
            { titulo: titulo, contenido: contenido }
        );

        return res.json({ mensaje: 'Publicaccion editada' })

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error',
            error: error
        });
    }
}

// ELIMINAR PUBLICACION //
PublicacionController.eliminarPublicacion = async (req, res) => {
    try {
        const { id } = req.body;

        await PublicacionModel.findByIdAndDelete(id);

        return res.json({ mensaje: 'Publicacion eliminada' })

    } catch (error) {

        return res.status(500).json({
            mensaje: 'Ocurrió un error',
            error: error
        });
    }
}

module.exports = PublicacionController;