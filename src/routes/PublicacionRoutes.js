const PublicacionRouter = require('express').Router();

const {
    verPublicacion,
    verPublicaciones,
    crearPublicacion,
    editarPublicacion,
    eliminarPublicacion,
} = require('./../controllers/PublicacionController');



//MONGOOSE//

// ver publicacion //
PublicacionRouter.get('/publicacion/:id', verPublicacion);

// ver publicacions //
PublicacionRouter.get('/publicaciones', verPublicaciones);

// crear publicacion //
PublicacionRouter.post('/publicacion', crearPublicacion);

// editar publicacion //
PublicacionRouter.put('/publicacion', editarPublicacion);

// eliminar publicacion //
PublicacionRouter.delete('/publicacion', eliminarPublicacion);


module.exports = PublicacionRouter;