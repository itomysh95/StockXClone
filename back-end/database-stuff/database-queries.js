const pool = require('../database-stuff/database-pool')

// drop tables
const dropTable=async(tables)=>{
    if(!tables){
        throw {error:'No tables given'}
    }
    try{
        tables = tables.toString()
        await pool.query(
            `DROP TABLE IF EXISTS ${tables} CASCADE;`
        )
        return{msg:`${tables} were dropped`}
    }catch(error){
        return error
    }
}


module.exports={
    dropTable,
}