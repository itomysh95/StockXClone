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
    `\"completed\"`
]

// get the lowest ask or highest bid prices of a sneaker based on size
// if bid parameter empty => bid, if bid parameter = NOT => ask
const getSizePrice= async(sneakerName,bid='')=>{
    try{
        let prices = await pool.query(
            `SELECT DISTINCT ON (${inventoryParam[3]}) 
            ${inventoryParam[2]},${inventoryParam[3]} ,id
            FROM inventory
            WHERE LOWER(${inventoryParam[0]})=$1
            AND ${bid} ${inventoryParam[1]}
            AND NOT ${inventoryParam[5]}
            ORDER BY ${inventoryParam[3]},${inventoryParam[2]} ASC
            `,[sneakerName.toLowerCase()]
        )
        let sizePrices={}
        prices.rows.map(priceSizePair=>{
            sizePrices[priceSizePair.size*10]=[priceSizePair.price,priceSizePair.id]
        })

        // for those sizes that do not have any bids/asks yet, set value to ask/bid, and id to null
        let i;
        for(i=3;i<19;i++){
            if(!sizePrices[i*10]){
                sizePrices[i*10]=[null,null]
            }
            if(!sizePrices[(i+0.5)*10]){
                sizePrices[(i+0.5)*10]=[null,null]
            }
        }
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
            AND NOT ${inventoryParam[5]}
            `,
            [sneakerName.toLowerCase()]
        )
        return count.rows[0].count
    }catch(error){
        return {error}
    }
}

// get an amount of bid/ask prices of a given sneaker
const getPrices = async(sneakerName,amount,bid='')=>{
    try{
        let order = 'DESC'
        // if not bid => it's a sale => highest bid prices
        if(bid==='NOT'){
            order = 'ASC'
        }
        // if bid value='NOT' will return ask values
        let prices = await pool.query(
            `SELECT ${inventoryParam[2]} FROM inventory
            WHERE LOWER(${inventoryParam[0]})=$1
            AND ${bid} ${inventoryParam[1]}
            AND NOT ${inventoryParam[5]}
            ORDER BY ${inventoryParam[2]} ${order} 
            FETCH FIRST ${amount} ROWS ONLY
            `,
            [sneakerName.toLowerCase()]
        )
        return prices.rows
    }catch(error){
        return {error}
    }
}


// select the highest bid prices of all sneakers (amount to return specified in params)
const getPricesAll = async(amount,bid='')=>{
    try{
        let order = 'DESC'
        if(bid==='NOT'){
            order = 'ASC'
        }
        let prices = await pool.query(
            // sort the inventory table by sneaker name, then by price
            // next select the first row of each sneaker name (will return the highest price of each sneaker)
            // finally sort the  highest price of every sneaker by price and take first n rows
            `SELECT * FROM 
            (SELECT DISTINCT ON (${inventoryParam[0]}) * 
            FROM (
                SELECT * FROM inventory
                WHERE ${bid} ${inventoryParam[1]}
                AND NOT ${inventoryParam[5]}
                ORDER BY ${inventoryParam[0]}, ${inventoryParam[2]} ${order}
            ) AS inventorySorted) AS maxValues
            ORDER BY ${inventoryParam[2]} ${order}
            FETCH FIRST ${amount} ROWS ONLY`
        )
        return prices.rows
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
        let lowestAskPrice = await getPrices(sneakerName,1,'NOT');
        let highestBidPrice = await getPrices(sneakerName,1);
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

// find and return a quote by id
const getById = async(id)=>{
    try{
        let quote = await pool.query(
            `SELECT * FROM INVENTORY 
            WHERE id = $1
            `
        ,[id])
        return quote.rows
    }catch(error){
        console.log(error)
        return {error}
    }
}

//  find a quote by id and set the status to completed, return true if set,
// else false
const completeQuote = async(id,client)=>{
    try{
        let thread = client || pool
        let quote = await thread.query(
            `SELECT completed FROM inventory
            WHERE id = $1
            `,[id]
        )
        // if this quote is already completed
        if(!quote.rows||quote.rows[0].completed){
            return false
        }
        // else complete the quote
        quote = await thread.query(
            `UPDATE inventory
            SET completed=true
            WHERE id = $1
            RETURNING *`,
            [id]
        )
        return quote.rows
    }catch(error){
        return {error}
    }
}

export {
    getQuantity,
    getPrices,
    newEntry,
    getDetails,
    getPricesAll,
    getSizePrice,
    getById,
    completeQuote,
}