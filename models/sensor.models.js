const mongoose = require('mongoose');

//schema de usuarios
const sensores = new mongoose.Schema({

    nombres:{
        type:String,
        required:true
    },
    lectura:{
        type:String,
        required:true
    },

    fecha:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Sensores', sensores)