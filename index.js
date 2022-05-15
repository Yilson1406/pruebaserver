const express = require('express')
const app = express()
const  mongoose  = require('mongoose')
const config = require('config');
//const { dbConnection } = require('./db/config');

let users = [
    {
      id: 1,
      user: 'Juan',
    },
    {
      id: 2,
      user: 'Agustina',
    },
]
//dbConnection();
app.get('/', (request, response) => {
    response.send('<h1>Servidor con express</h1>')
})

app.get('/api/users', (request, response) => {
    response.json(users)
})
//conexion a base de datos

mongoose.connect(config.get('configDB.HOST'),{useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Api Conectado a la base de datos con éxito');})
    .catch(error=>{
        console.log('Error al conectarse a la base de datos', error);
    });

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`El servidor está levantado en el puerto ${PORT}`) 
})
