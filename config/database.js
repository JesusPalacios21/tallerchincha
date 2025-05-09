const mysql = require('mysql2/promise')

//Crear pool de acceso
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tallerchincha'
})

async function testConnection(){
  try{
    const connection = await pool.getConnection();
    console.log("Conexion Exitosa")
    connection.release() //Liberar
  }catch(error){
    console.error("Error: ", error)
  }
}

testConnection();
module.exports = pool;