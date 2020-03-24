import {pool} from '../database-stuff/database-pool'
import {buildValues,toTitleCase} from '../database-stuff/database-queries'
// id                  SERIAL PRIMARY KEY,
// "sneakerName"       VARCHAR(64) NOT NULL,
// "bid"               BOOLEAN NOT NULL,
// "price"             MONEY NOT NULL,
// "size"              FLOAT NOT NULL
const inventoryParam = [
    `\"sneakerName\"`,
    `\"bid\"`,
    `\"price\"`,
    `\"size\"`,
    `\"male\"`,
]

// get the lowest ask or highest bid prices of a sneaker based on size
// if bid parameter empty => bid, if bid parameter = NOT => ask
const getSizePrice= async(sneakerName,bid='')=>{
    try{
        let prices = await pool.query(
            `SELECT DISTINCT ON (${inventoryParam[3]}) 
            ${inventoryParam[2]},${inventoryParam[3]} 
            FROM inventory
            WHERE LOWER(${inventoryParam[0]})=$1
            AND ${bid} ${inventoryParam[1]}
            ORDER BY ${inventoryParam[3]},${inventoryParam[2]} ASC
            `,[sneakerName.toLowerCase()]
        )
        let sizePrices={}
        prices.rows.map(priceSizePair=>{
            sizePrices[priceSizePair.size*10]=priceSizePair.price
        })
        return sizePrices
    }catch(error){
        console.log(error)
        return{error}
    }
}


const getQuantity = async(sneakerName,type)=>{
    try{
        let buy = `${inventoryParam[1]}`
        // if we want the quantity of asks 
        if(type==='ask'){
            buy = `NOT ${inventoryParam[1]}`
        }
        let count = await pool.query(
            `SELECT COUNT(${inventoryParam[1]})
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

// get an amount of bid prices of a given sneaker
const getBid = async(sneakerName,amount)=>{
    try{
        let bidPrices = await pool.query(
            `SELECT ${inventoryParam[2]} FROM inventory
            WHERE LOWER(${inventoryParam[0]})=$1
            AND ${inventoryParam[1]}
            ORDER BY ${inventoryParam[2]} DESC 
            FETCH FIRST ${amount} ROWS ONLY
            `,
            [sneakerName.toLowerCase()]
        )
        return bidPrices.rows
    }catch(error){
        return {error}
    }
}


// select the highest bid prices of all sneakers (amount to return specified in params)
const getBidAll = async(amount)=>{
    try{
        let data = await pool.query(
            // sort the inventory table by sneaker name, then by price
            // next select the first row of each sneaker name (will return the highest price of each sneaker)
            // finally sort the  highest price of every sneaker by price and take first n rows
            `SELECT * FROM 
            (SELECT DISTINCT ON (${inventoryParam[0]}) * 
            FROM (
                SELECT * FROM inventory
                WHERE ${inventoryParam[1]}
                ORDER BY ${inventoryParam[0]}, ${inventoryParam[2]} DESC 
            ) AS inventorySorted) AS maxValues
            ORDER BY ${inventoryParam[2]} DESC
            FETCH FIRST ${amount} ROWS ONLY`
        )
        return data.rows
    }catch(error){
        console.log(error)
        return {error}
    }
}

// get an amount of ask prices of a given sneaker
const getAsk = async(sneakerName,amount)=>{
    try{
        let data = await pool.query(
            `SELECT ${inventoryParam[2]} FROM inventory
            WHERE LOWER(${inventoryParam[0]})=$1
            AND NOT ${inventoryParam[1]}
            ORDER BY ${inventoryParam[2]} ASC
            FETCH FIRST ${amount} ROWS ONLY
            `,
            [sneakerName.toLowerCase()]
        )
        return data.rows
    }catch(error){
        return {error}
    }
}

// get an amount of lowest ask prices of all sneakers
const getAskAll = async(amount)=>{
    try{
        let data = await pool.query(
            // sort the inventory table by sneaker name, then by price
            // next select the first row of each sneaker name (will return the lowest price of each sneaker)
            // finally sort the lowest price of every sneaker by price and take first n rows
            `SELECT * FROM 
            (SELECT DISTINCT ON (${inventoryParam[0]}) * 
            FROM (
                SELECT * FROM inventory
                WHERE NOT ${inventoryParam[1]}
                ORDER BY ${inventoryParam[0]}, ${inventoryParam[2]} ASC 
            ) AS inventorySorted) AS minimumValues
            ORDER BY ${inventoryParam[2]} ASC
            FETCH FIRST ${amount} ROWS ONLY`
        )
        return data.rows
    }catch(error){
        console.log(error)
        return {error}
    }
}

// to create a new bid/ask entry
const newEntry = async(entryDetails)=>{
    try{
        // fix case sensitivity, upper case the start of every letter
        let keyValue = {...entryDetails, 
            sneakerName:toTitleCase(entryDetails.sneakerName)
        }
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
        console.log(error)
        return {error}
    }
}

// get lowest ask, highest bid and quantity in stock of a sneaker
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
    getDetails,
    getBidAll,
    getAskAll,
    getSizePrice
}