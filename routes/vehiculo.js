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

module.exports = router