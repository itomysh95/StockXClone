import {pool} from '../database-stuff/database-pool'
import {buildValues,toTitleCase} from '../database-stuff/database-queries'
import {
    getById,
    completeQuote
} from './inventory-table'
import { getSneaker, updateSneakerInfo } from './sneaker-table'
import { newPaymentInfo } from './payment-table'


// `CREATE TABLE IF NOT EXISTS orders(
//     id                     SERIAL PRIMARY KEY,
//     "inventoryId"          SERIAL NOT NULL,
//     "buyerId"              SERIAL NOT NULL REFERENCES customer("id") ON DELETE CASCADE,
//     "sellerId"             SERIAL NOT NULL REFERENCES customer("id") ON DELETE CASCADE,
//     FOREIGN KEY ("inventoryId") REFERENCES inventory("id") ON DELETE CASCADE
// );`


// creating a new order
const createOrder = async (orderDetails)=>{
    try{
        let quote = await getById(orderDetails.id)
        // Check that the id of the bid/ask exists before buying / selling it
        if(!quote){
            throw {error:'this quote does not exist'}
        }
        // if the customer is not signed in, create a guest account
        // else use the customer's account
        let account;
        if(!orderDetails.account.loggedIn){
            
        }else{

        }
        // set the quote status to completed
        let completed = await completeQuote(orderDetails.id)
        // if something went wrong with completeing the quote
        if(!completed){
            throw {error: 'could not complete the quote at this time'}
        }
        // create the order in order database
        let order ={    

        }
        const orderEntry = newOrderEntry(order)
        // ---------------------------------------------------------
        // TODO 
        // create payment info for order in payment database
        // const paymentEntry = await newPaymentInfo(orderDetails.paymentInfo)
        // create shipping info for order in shipping database
        // ---------------------------------------------------------

        // update number of sold count in sneakersdb
        let sneaker = await getSneaker(quote[0].sneakerName)
        sneaker = await updateSneakerInfo(sneaker.data.sneakerName,{
            'amountSold':sneaker.data.amountSold+=1
        })
        return{
            sucess:'Order created successfully'
        }
    }catch(error){
        console.log(error)
        return error
    }
}

// inserting a new order entry into orders table
const newOrderEntry = async (orderDetails)=>{
    try{
        // ----------TODO----------
        // if the order for this quote already exists
        // if(getOrderByInventoryId()){
        //     throw {error: `order for ${orderDetails.inventoryId} already exists`}
        // }
        // ------------------------
        let columns = Object.keys(orderDetails).map(param=>`\"${param}\"`)
        let values = await buildValues(Object.values(orderDetails))
        let order = await pool.query(
            `INSERT INTO orders(${columns})
            VALUES ${values}
            ON CONFLICT DO NOTHING
            RETURNING *
            `,[Object.values(orderDetails)]
        )
        return order.rows
    }catch(error){
        console.log(error)
        return {error}
    }
}

// return an order entry given an inventory id
const getOrderById = async(id)=>{
    try{
        let order = await pool.query(

        )
        return order.rows
    }catch(error){
        console.log(error)
        return{error}
    }
}

export {
    createOrder
}