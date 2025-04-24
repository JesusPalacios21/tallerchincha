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

  }
  
});

router.get('/create', async(req,res) => {
  try{
    const[datos] = await db.query("SELECT * FROM marcas")
    res.render('create', {marcas:datos})
  }catch(error){
    console.error
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

module.exports = router