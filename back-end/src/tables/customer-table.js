import {pool} from '../database-stuff/database-pool'
import {buildValues,toTitleCase} from '../database-stuff/database-queries'


// `CREATE TABLE IF NOT EXISTS customer(
//     id                  SERIAL PRIMARY KEY,
//     "fullName"          VARCHAR(64) NOT NULL,
//     "phoneNumber"       INTEGER NOT NULL,
//     "addressOne"        VARCHAR(128) NOT NULL,
//     "addressTwo"        VARCHAR(128),
//     "city"              VARCHAR(64) NOT NULL,
//     "country"           VARCHAR(64) NOT NULL,
//     "zipCode"           VARCHAR(64) NOT NULL,
//     "province"          VARCHAR(64) NOT NULL,
//     "accountId"         SERIAL NOT NULL
//     FOREIGN KEY ("accountId") REFERENCES account("id") ON DELETE CASCADE
// );`

// creates a new customer entry
const createCustomer = async(customerDetails)=>{
    try{
        const columns = Object.keys(customerDetails).map((columnName)=>`\"${columnName}\"`)
        const values = buildValues(Object.values(customerDetails))
        const customer = await pool.query(
            `
            INSERT INTO customer(${columns})
            VALUES(${values})
            RETURNING *
            `,Object.values(customerDetails)
        )
        return customer.rows[0]
    }catch(error){
        console.log(error)
        return {error}
    }
}

// given an id, return the customer information
const getCustomerById = async(customerId)=>{
    try{
        const customer = await pool.query(
            `
            SELECT * FROM cusutomer 
            WHERE id = $1
            `,[customerId]
        )
        return customer
    }catch(error){
        console.log(error)
        return {error}
    }
}

export {
    createCustomer,
    getCustomerById
}