const express = require('express')
const router = express.Router()
const db = require('../config/database')

router.get('/', async (req,res) => {
  try{
    const query = `
    SELECT 
	v.idvehiculo,
    m.marca,
    v.modelo,
    v.color,
    v.combustible,
    v.afabricacion,
    v.condicion
	FROM vehiculos v
    INNER JOIN marcas m ON v.idmarca = m.idmarca
  `
  const [vehiculos] = await db.query(query)
  //res.send(vehiculos)
  res.render('index', {vehiculos})
  }catch(error){
    console.error(error)
  }
  
});

//RUTA PARA CREATE
router.get('/create', async(req,res) => {
  try{
    const[datos] = await db.query("SELECT * FROM marcas")
    res.render('create', {marcas:datos})
  }catch(error){
    console.error(error)
  }
})


//RUTA PARA EDIT => Se identidica el "id"
router.get('/edit/:id', async(req,res) => {
  try{
    const[datos] = await db.query("SELECT * FROM marcas")
    const [registro] = await db.query("SELECT * FROM vehiculos WHERE idvehiculo = ?", [req.params.id])

    if(registro.length > 0){
      res.render('edit', {marcas:datos, vehiculo: registro[0]})
    }else{
      res.redirect('/')
    }
      
  }catch(error){
    console.error(error)
  }
})


router.post('/create', async(req, res) => {
  try{
    //Obtener los datos
    const {marcas, modelo, color, combustible, afabricacion, condicion} = req.body
    //Guardar los datos
    await db.query(`INSERT INTO vehiculos (idmarca, modelo, color, combustible, afabricacion, condicion) VALUES (?,?,?,?,?,?)`, 
      [marcas, modelo, color, combustible, afabricacion, condicion])
    res.redirect('/')
  }catch(error){
    console.error(error)
  }
})

//PROCESO DE ACTUALIZACION DE DATOS
router.post('/edit/:id', async(req, res) => {
  try{
    //Obtener los datos
    const {marcas, modelo, color, combustible, afabricacion, condicion} = req.body
    //Guardar los datos
    await db.query("UPDATE vehiculos SET idmarca=?, modelo=?, color=?, combustible=?, afabricacion=?, condicion=? WHERE idvehiculo=?", 
      [marcas, modelo, color, combustible, afabricacion, condicion, req.params.id])
    res.redirect('/')
  }catch(error){
    console.error(error)
  }
})

//ELIMINACION
router.get('/delete/:id', async(req, res) => {
  try{
    //Datos que ingresan por el <form></form> req.body
    //Datos que ingresan por GET/URL req.params.atributo
    const [resultado] = await db.query("DELETE FROM vehiculos WHERE idvehiculo = ?", [req.params.id])
    //res.send(resultado)
    res.redirect('/')
  }catch(error){
    console.error(error)
  }
})

module.exports = router