
const pool = require('../database-stuff/database-pool')

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


// get a sneaker by name
const getSneaker = async (sneakerName,filter={})=>{
    try{
        const data = await pool.query(
            `SELECT ${sneakerParams} FROM sneaker 
            WHERE LOWER("sneakerName")=$1`,
            [sneakerName.toLowerCase()]
        )
        // if sneaker doens't exist
        if(data.rows.length===0){
            throw {detail:"sneaker does not exist"}
        }
        // else return the sneaker info
        return {data:data.rows}
    }catch(error){
        return {error}
    }
}

// get all the sneakers of a brand
const getSneakers = async(brand)=>{
    try{
        const data = await pool.query(
            `SELECT ${sneakerParams} FROM sneaker 
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
const updateSneakerInfo=async(sneakerName,update)=>{
    try{
        // get the columns to be updated
        let columns = [...Object.keys(update)]
        let i;
        // get the new values
        let values = [...Object.values(update)]
        // wrap strings in quotes for SQL query
        values = values.map(value=>{
            if(typeof value === 'string'){
                return `\'${value}\'`
            }
            return value
        })
        // incase there is only 1 update
        let queryString=`"${columns[0]}" = `+values[0];
        // if more than one update, build the query
        if(columns.length>1){
            for(i=1;i<columns.length;i++){
                queryString+=','+`"${columns[i]}"`+"="+values[i]
            }
        }
        const data = await pool.query(
                    `UPDATE sneaker 
                    SET ${queryString} 
                    WHERE LOWER("sneakerName")=$1
                    RETURNING ${sneakerParams}`,
                    [sneakerName])
        
        return {data:data.rows}

    }catch(error){
        return{error}
    }
}

// create a new sneaker in the database
const createSneaker = async (sneaker)=>{
    try{
    // make sure any case sensitivity are fixed
        const sneakerInput = {...sneaker, brandName:sneaker.brandName.toLowerCase().replace(/^\w/, c => c.toUpperCase())}
        const data = await pool.query(
            `INSERT INTO sneaker(${sneakerParams}) 
            VALUES($1,$2,$3,$4,$5) 
            RETURNING ${sneakerParams}`,
            Object.values(sneakerInput)
        )
        // return the sneaker that was added
        return {data:data.rows}
    }catch(error){
        return {error}
    }
}

// delete a sneaker from the database
const deleteSneaker = async(sneakerName)=>{
    try{
        const data = await pool.query(
            `DELETE FROM sneaker 
            WHERE LOWER("sneakerName")=$1 
            RETURNING ${sneakerParams}`,
        [sneakerName.toLowerCase()])
        // if sneaker doens't exist
        if(data.rows.length===0){
            throw {detail:"sneaker does not exist"}
        }
        return {data: data.rows}
    }catch(error){
        return{error}
    }
}

const getId = async(sneakerName)=>{
    try{
        const data = await pool.query(
            `SELECT id FROM sneaker`
        )
        return {data:data.rows}
    }
    catch(error){
        console.log(error)
    }
}


module.exports={
    getSneaker,
    createSneaker,
    getSneakers,
    updateSneakerInfo,
    deleteSneaker,
    getId
}


