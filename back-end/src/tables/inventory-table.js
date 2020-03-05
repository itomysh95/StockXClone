import {pool} from '../database-stuff/database-pool'
import {buildValues,toTitleCase} from '../database-stuff/database-queries'
// id                  SERIAL PRIMARY KEY,
// "sneakerName"       VARCHAR(64) NOT NULL,
// "quantity"          INTEGER NOT NULL,
// "bid"               BOOLEAN NOT NULL,
// "price"             MONEY NOT NULL
const inventoryParam = [
    `\"sneakerName\"`,
    `\"quantity\"`,
    `\"bid\"`,
    `\"price\"`,
]


const getQuantity = async(sneakerName,type)=>{
    try{
        let buy = `${inventoryParam[2]}`
        // if we want the quantity of asks 
        if(type==='ask'){
            buy = `NOT ${inventoryParam[2]}`
        }
        let count = await pool.query(
            `SELECT COUNT(${inventoryParam[2]})
            FROM inventory
            WHERE LOWER(${inventoryParam[0]})=$1
            AND ${buy}
            `,
            [sneakerName.toLowerCase()]
        )
        return count.rows[0].count
    }catch(error){
        return {error}
    }
}


const getBid = async(sneakerName,amount)=>{
    try{
        let data = await pool.query(
            `SELECT ${inventoryParam[3]} FROM inventory
            WHERE LOWER(${inventoryParam[0]})=$1
            AND ${inventoryParam[2]}
            ORDER BY ${inventoryParam[3]} ASC 
            LIMIT ${amount}
            `,
            [sneakerName.toLowerCase()]
        )
        return data.rows
    }catch(error){
        return {error}
    }
}

const getAsk = async(sneakerName,amount)=>{
    try{
        let data = await pool.query(
            `SELECT ${inventoryParam[3]} FROM inventory
            WHERE LOWER(${inventoryParam[0]})=$1
            AND NOT ${inventoryParam[2]}
            ORDER BY ${inventoryParam[3]} DESC
            LIMIT ${amount}
            `,
            [sneakerName.toLowerCase()]
        )
        return data.rows
    }catch(error){
        return {error}
    }
}

const newEntry = async(entryDetails)=>{
    try{
        // fix case sensitivity, upper case the start of every letter
        let keyValue = {...entryDetails, 
            sneakerName:toTitleCase(entryDetails.sneakerName)
        }
        console.log(keyValue.price)
        // wrap the column names by quotes
        const columns = Object.keys(keyValue).map((columnName)=>`\"${columnName}\"`)
        const values = buildValues(Object.values(keyValue))
        // create new bid/ask entry in database
        let data = await pool.query(
            `INSERT INTO inventory(${columns})
            VALUES(${values})
            RETURNING *`,
            Object.values(keyValue)
        )
        return {data:data.rows[0]}
    }catch(error){
        return {error}
    }
}

const getDetails = async(sneakerName)=>{
    try{
        let lowestAskPrice = await getAsk(sneakerName,1);
        let highestBidPrice = await getBid(sneakerName,1);
        // if there are no bid or ask prices, set it to none
        if(!lowestAskPrice[0]){
            lowestAskPrice = 'None'
        }else{
            lowestAskPrice = lowestAskPrice[0].price
        }
        if(!highestBidPrice[0]){
            highestBidPrice = 'None'
        }else{
            highestBidPrice = highestBidPrice[0].price
        }
        let quantity = await getQuantity(sneakerName);
        let details={
            quantity,
            lowestAskPrice,
            highestBidPrice,
        }
        return {data:details}
    }catch(error){
        console.log(error)
        return {error}
    }
}

export {
    getQuantity,
    getBid,
    getAsk,
    newEntry,
    getDetails
}