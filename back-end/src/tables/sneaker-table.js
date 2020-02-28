import {buildValues,
    updateQueryBuilder} from '../database-stuff/database-queries'
import {pool} from '../database-stuff/database-pool'

// CREATE TABLE sneaker(
//     id              SERIAL PRIMARY KEY,
//     "sneakerName"   VARCHAR(64) NOT NULL,
//     quantity        INTEGER NOT NULL,
//     "amountSold"    INTEGER NOT NULL,
//     "sneakerinfo"   TEXT,
//     "brandName"     INTEGER, 
//     FOREIGN KEY     ("brandName") REFERENCES brand("brandName")   
// );

const sneakerParams = [
    `\"sneakerName\"`,
    `\"quantity\"`,
    `\"amountSold\"`,
    `\"sneakerInfo\"`,
    `\"brandName\"`
]

// TODO figure out best way to throw errors for error handling...



// get a sneaker by name
const getSneaker = async (sneakerName,filter={})=>{
    try{
        const data = await pool.query(
            `SELECT * FROM sneaker 
            WHERE LOWER(${sneakerParams[0]})=$1`,
            [sneakerName.toLowerCase()]
        )
        // if sneaker doens't exist
        if(data.rows.length===0){
            throw {error:"sneaker does not exist"}
        }
        // else return the sneaker info
        return {data:data.rows[0]}
    }catch(error){
        return {error}
    }
}

// get all the sneakers of a brand
const getSneakers = async(brand)=>{
    try{       
        const data = await pool.query(
            `SELECT * FROM sneaker 
            WHERE LOWER("brandName")=$1`,
            [brand.toLowerCase()]
        )
        // return the sneakers found for this brand
        return {data:data.rows}
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
                    WHERE LOWER(${sneakerParams[0]})=$1
                    RETURNING *`,
                    [sneakerName])
        // if the sneaker does not exist
        if(sneaker.rows.length===0){
            throw {error:'sneaker does not exist'}
        }
        return {sneaker:sneaker.rows[0]}
    }catch(error){
        return error
    }
}


// create a new sneaker in the database
const createSneaker = async (sneaker)=>{
    try{
    // make sure any case sensitivity are fixed
        let keyValue = {...sneaker, 
            brandName:sneaker.brandName
            .toLowerCase()
            .replace(/^\w/, c => c.toUpperCase())}
        // wrap the column names by quotes
        const columns = Object.keys(keyValue).map((columnName)=>`\"${columnName}\"`)
        const values = buildValues(Object.values(keyValue))
        const data = await pool.query(
            `INSERT INTO sneaker(${columns}) 
            VALUES(${values}) 
            RETURNING *`,
            Object.values(keyValue)
        )
        // return the sneaker that was added
        return {data:data.rows[0]}
    }catch(error){
        return {error}
    }
}

// delete a sneaker from the database
const deleteSneaker = async(sneakerName)=>{
    try{
        const data = await pool.query(
            `DELETE FROM sneaker 
            WHERE LOWER(${sneakerParams[0]})=$1 
            RETURNING *`,
        [sneakerName.toLowerCase()])
        // if sneaker doens't exist
        if(data.rows.length===0){
            throw {detail:"sneaker does not exist"}
        }
        return {data: data.rows[0]}
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


// get the top (amount) most popular sneakers(by total amount sold)
const getPopular = async(amount)=>{
    try{
        const sneakerList = await pool.query(
            `SELECT * FROM sneaker
            ORDER BY ${sneakerParams[2]} desc
            limit ${amount}`
        )
        return {list:sneakerList.rows}
    }catch(error){
        console.log(error)
    }
}

export{
    getSneaker,
    getSneakers,
    updateSneakerInfo,
    deleteSneaker,
    getPopular,
    createSneaker
}