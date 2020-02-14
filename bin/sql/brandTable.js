const pool = require('../../src/dataBaseStuff/databasePool.js')

// CREATE TABLE brand(
//     id          SERIAL PRIMARY KEY,
//     "brandName" VARCHAR(64) NOT NULL
// );


// get info on a brand
const getBrand= async (brandName,filter={})=>{
        try{
            const response = await pool.query('SELECT * FROM brand WHERE ')
        }catch(error){
            console.log("error: ",error)
        }
    }

    // create a new brand in the database
const createBrand= async (brand)=>{
        try{
            await pool.query('INSERT INTO brand("brandName") VALUES($1)',
            [brand.name])
        }catch(error){
            console.log(error.stack)
        }
    }

module.exports={
    createBrand,
    getBrand
}