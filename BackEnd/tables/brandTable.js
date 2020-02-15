const pool = require('../dataBaseStuff/databasePool')

// CREATE TABLE brand(
//     id          SERIAL PRIMARY KEY,
//     "brandName" VARCHAR(64) NOT NULL
// );


// get a brand from database TODO: make more abstract
const getBrand= async (name)=>{
    // if(filter.length===0){
    //     filter = '*'
    // }
    try{
        const data = await pool.query(`SELECT * FROM brand WHERE LOWER("brandName")=$1`,
        [name])
        return {data:data.rows}
    }catch(error){
        return{error}
    }
}

// return all brands TODO: able to use getBrand() for this case too?
const getAllBrands = async()=>{
    try{
        const data = await pool.query(`SELECT * FROM brand`)
        return {data:data.rows}
    }
    catch(error){
        return{error}
    }
}

// create a new brand in the database if it does not exist
const createBrand= async (brand)=>{
    try{
        const data = await pool.query('INSERT INTO brand("brandName") VALUES($1) RETURNING *',
        [brand.name])
        // return the newly added row data
        return {data:data.rows}
    }catch(error){
        return {error}
    }
}

// remove a brand in the database 'TODO: move it to a staging delete table instead'
const removeBrand = async(name)=>{
    try{
        const data = await pool.query('DELETE FROM brand WHERE LOWER("brandName")=$1 RETURNING *',
        [name])
        return{data:data.rows}
    }catch(error){
        return{error}
    }
}

// update information on brand 
const updateBrand = async(brand)=>{
    // to fill out when other brand info comes in, most popular?
}

// TODO delete permenantly by 
const removePerm = async(brand)=>{

}

module.exports={
    createBrand,
    getBrand,
    removeBrand,
    updateBrand,
    getAllBrands
}