
import {pool} from'../database-stuff/database-pool'
import {updateQueryBuilder} from '../database-stuff/database-queries'
// CREATE TABLE sneaker(
//     id              SERIAL PRIMARY KEY,
//     "sneakerName"   VARCHAR(64) NOT NULL,
//     quantity        INTEGER NOT NULL,
//     "amountSold"    INTEGER NOT NULL,
//     "sneakerinfo"   TEXT,
//     "brandName"     INTEGER, 
//     FOREIGN KEY     ("brandName") REFERENCES brand("brandName")   
// );

const sneakerParams = `
    \"sneakerName\"
    ,\"quantity\"
    ,\"amountSold\"
    ,\"sneakerInfo\"
    ,\"brandName\"`


// TODO figure out best way to throw errors for error handling...


// get a sneaker by name
const getSneaker = async (sneakerName,filter={})=>{
    try{
        const sneaker = await pool.query(
            `SELECT ${sneakerParams} FROM sneaker 
            WHERE LOWER("sneakerName")=$1`,
            [sneakerName.toLowerCase()]
        )
        // if sneaker doens't exist
        if(sneaker.rows.length===0){
            throw {error:"sneaker does not exist"}
        }
        // else return the sneaker info
        return {sneaker:sneaker.rows}
    }catch(error){
        return {error}
    }
}

// get all the sneakers of a brand
const getSneakers = async(brand)=>{
    try{
        const sneakers = await pool.query(
            `SELECT ${sneakerParams} FROM sneaker 
            WHERE LOWER("brandName")=$1`,
            [brand.toLowerCase()]
        )
        // TODO case where brand does not exist
        // if no sneakers were found
        if(sneakers.rows.length===0){
            throw {error:"no sneakers found"}
        }
        return {sneakers:sneakers.rows}
    }catch(error){
        return {error}
    }
}

// update sneaker info
const updateSneakerInfo=async(sneakerName,sneakerUpdates)=>{
    try{
        const updates = await updateQueryBuilder(sneakerUpdates)
        const sneaker = await pool.query(
                    `UPDATE sneaker 
                    SET ${updates} 
                    WHERE LOWER("sneakerName")=$1
                    RETURNING ${sneakerParams}`,
                    [sneakerName])
        // if the sneaker does not exist
        if(sneaker.rows.length===0){
            throw {error:'sneaker does not exist'}
        }
        return {sneaker:sneaker.rows}
    }catch(error){
        return error
    }
}


// TODO currently it requires user to enter all fields for creating a new sneaker,
// but database does not require all fields, find a way to implement 
// create a new sneaker in the database
const createSneaker = async (sneaker)=>{
    try{
    // make sure any case sensitivity are fixed
        const sneakerInput = {...sneaker, brandName:sneaker.brandName.toLowerCase().replace(/^\w/, c => c.toUpperCase())}
        const sneaker = await pool.query(
            `INSERT INTO sneaker(${sneakerParams}) 
            VALUES($1,$2,$3,$4,$5) 
            RETURNING ${sneakerParams}`,
            Object.values(sneakerInput)
        )
        // return the sneaker that was added
        return {sneaker:sneaker.rows}
    }catch(error){
        return {error}
    }
}

// delete a sneaker from the database
const deleteSneaker = async(sneakerName)=>{
    try{
        const sneaker = await pool.query(
            `DELETE FROM sneaker 
            WHERE LOWER("sneakerName")=$1 
            RETURNING ${sneakerParams}`,
        [sneakerName.toLowerCase()])
        // if sneaker doens't exist
        if(sneaker.rows.length===0){
            throw {detail:"sneaker does not exist"}
        }
        return {sneaker: sneaker.rows}
    }catch(error){
        return{error}
    }
}

// TODO 
// const getId = async(sneakerName)=>{
//     try{
//         const sneaker = await pool.query(
//             `SELECT id FROM sneaker`
//         )
//         return {sneaker:sneaker.rows}
//     }
//     catch(error){
//         console.log(error)
//     }
// }


export {
    getSneaker,
    createSneaker,
    getSneakers,
    updateSneakerInfo,
    deleteSneaker,
    // getId
}
