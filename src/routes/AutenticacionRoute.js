const autenticacionRouter = require('express').Router();

const {
    autenticar,
    registracion,
    verificarToken
} = require('./../controllers/AutenticacionController.js');

autenticacionRouter.post('/autenticar', autenticar);


autenticacionRouter.post('/verificartoken', verificarToken);




module.exports = autenticacionRouter;