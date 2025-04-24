const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const rutaVehiculo =require('./routes/vehiculo')
//const rutaMarca = require('./routes/marca')

const app = express();
const PORT = process.env.PORT || 3000

//Configuracion "middleware" => Capa de comunicacion
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

//Configuracion de las rutas
app.use('/', rutaVehiculo);         //Principal
//app.use('/api/marcas', rutaMarca)   //Suministrar datos

//Servidor WEB
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`)
});

