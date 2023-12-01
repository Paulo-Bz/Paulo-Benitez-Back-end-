const { Schema, model } = require('mongoose');

const PublicacionSchema = new Schema({
    titulo: String,
    contenido: String,
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
    },


});

const PublicacionModel = model('publicaciones', PublicacionSchema);


module.exports = PublicacionModel;