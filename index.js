const express = require('express')
const app = express()
const  mongoose  = require('mongoose')
const config = require('config');
const cors = require('cors');
//const { dbConnection } = require('./db/config');

const rutas = require('./routes/rutas');
//const auth = require('./auth/auth');

// millwared para recibir datos json y por url
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors())


app.use('/api/monitoreo',rutas);
//app.use('/api/auth',auth);
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
