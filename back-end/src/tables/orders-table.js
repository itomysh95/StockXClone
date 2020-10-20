import {pool} from '../database-stuff/database-pool'
import {buildValues,toTitleCase} from '../database-stuff/database-queries'
import {
    getById,
    completeQuote
} from './inventory-table'
import { getSneaker, updateSneakerInfo } from './sneaker-table'
import {
    createGuestAccount
} from './account-table'
import {
    createCustomer
} from './customer-table'

import { newPaymentInfo } from './payment-table'


// CREATE TABLE IF NOT EXISTS orders(
//     id                     SERIAL PRIMARY KEY,
//     "inventoryId"          SERIAL NOT NULL,
//     "buyerId"              SERIAL NOT NULL REFERENCES customer("id") ON DELETE CASCADE,
//     "sellerId"             SERIAL NOT NULL REFERENCES account("id") ON DELETE CASCADE,
//     "date"                 VARCHAR(64) NOT NULL,
//     FOREIGN KEY ("inventoryId") REFERENCES inventory("id") ON DELETE CASCADE
// );


// creating a new order
const createOrder = async (orderDetails,account=null)=>{
    const client = await pool.connect()
    try{
        let quote = await getById(orderDetails.id)
        // Check that the id of the bid/ask exists before buying / selling it
        if(!quote){
            throw {error:'this quote does not exist'}
        }
        await client.query('BEGIN')
        // if the customer is not signed in, create a guest account else use the customer's accounts
        if(!account){
            account = await createGuestAccount(client)
        }
        await createCustomer({
            ...orderDetails.shippingInfo,
            accountId:account.id
        },client)
        // set the quote status to completed
        quote = await completeQuote(orderDetails.id,client)
        // if something went wrong with completeing the quote
        if(!quote){
            throw {error: 'could not complete the quote at this time'}
        }
        // create the order in order database
        let buyerId = account.id
        let sellerId = quote[0].customerId
        if(quote[0].bid){
            buyerId = quote[0].customerId
            sellerId = account.id
        }
        let order ={    
            buyerId,
            sellerId,
            inventoryId:quote[0].id,
        }
        const orderEntry = await newOrderEntry(order,client)
        // ---------------------------------------------------------
        // TODO 
        // create payment info for order in payment database
        // const paymentEntry = await newPaymentInfo(orderDetails.paymentInfo)
        // create shipping info for order in shipping database
        // ---------------------------------------------------------

        // update number of sold count in sneakersdb
        let sneaker = await getSneaker(quote[0].sneakerName,client)
        sneaker = await updateSneakerInfo(sneaker.data.sneakerName,{
            'amountSold':sneaker.data.amountSold?sneaker.data.amountSold+=1:1
        },client)
        // update number of 
        await client.query('COMMIT')
        return orderEntry
    }catch(error){
        await client.query('ROLLBACK')
    }finally{
        await client.release()
    }
}

// inserting a new order entry into orders table
const newOrderEntry = async (orderDetails,client)=>{
    try{
        // ----------TODO----------
        // if the order for this quote already exists
        // if(getOrderByInventoryId()){
        //     throw {error: `order for ${orderDetails.inventoryId} already exists`}
        // }
        // ------------------------
        let thread = client || pool
        let columns = Object.keys(orderDetails).map(param=>`\"${param}\"`)
        let values = await buildValues(Object.values(orderDetails))
        let order = await thread.query(
            `INSERT INTO orders(${columns})
            VALUES(${values})
            ON CONFLICT DO NOTHING
            RETURNING *
            `,Object.values(orderDetails)
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