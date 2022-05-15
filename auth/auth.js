const express = require('express');
const jwt = require('jsonwebtoken');
const rutas = express.Router();
const config = require('config');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');

rutas.post('/',(req, res)=>{

    Usuario.findOne({email:req.body.email}).then(user=>{
        if (user) {
            const validarpassword = bcrypt.compareSync(req.body.password, user.password);

            if (!validarpassword) res.status(400).json({Error:'OK',Mensaje:'El usuario o contraseña son incorrectas'});

            const jsontoken = jwt.sign({
                usuario:{
                    id: user._id,
                    Nombres: user.nombres,
                    Email:user.email,
                }}, config.get('configToken.SEED'), {expiresIn: config.get('configToken.expiration')});

                    res.json( 
                        {
                        Token:jsontoken
                        })

        }else {
              res.status(400).json({
                  Error: 'OK',
                  Mensaje: 'El usuario o contraseña son incorrectas'
              })  
        }
    }).catch(error =>{
        res.status(400).json(error)
    })

});

rutas.post('/register',(req, res)=>{

    Usuario.findOne({cedula:req.body.cedula}).then(user=>{
        if (!user) {
            adduser(req.body).then(()=>{
                res.status(200).json({
                    msg:"Usuario Agregado con Exito"
                })
            }).catch(error=>{
                res.status(400).json({
                    msg:error
                })
            })
        }
        else{
            res.status(404).json({
                msg:"El numero de cedula ya se encuentra registrado."
            })
        }
    })
    .catch(error=>{
        res.status(400).json({
            msg:error
        })
    })

})

//f4unction para registrar un nuevo admin

async function adduser(body){
    const user = new Usuario({
        nombres:body.nombres,
        cedula:body.cedula,
        email:body.email,
        password:bcrypt.hashSync(body.password, 10)
    });

    return user.save();
}

module.exports = rutas;