import {pool} from '../../dataBase-stuff/database-pool'
import {buildValues, updateQueryBuilder} from '../../database-stuff/database-queries'
import {bcrypt} from 'bcrypt'
// CREATE TABLE account(
//  id                  SERIAL PRIMARY KEY,
//  "accountName"          VARCHAR(64) UNIQUE NOT NULL,
//  "password"          VARCHAR(64) NOT NULL,
//  "sneakersSold"      INT,
//  "sneakersBought"    INT,
// )

const accountParams = `
    \"accountName\",
    \"password\",
    \"sneakersSold\",
    \"sneakersBought\"`


// create a new account in database
const createAccount = async(accountDetails)=>{
    try{
        // to format the query string
        const accountDetail = await Object.keys(accountDetails).map(param=>`\"${param}\"`)
        const valueParam = await buildValues(accountDetail)

        const account = await pool.query(
            `INSERT INTO account(${accountDetail})
            VALUES(${valueParam})
            RETURNING *`
            ,[...Object.values(accountDetails)]
        )
        return {account: account.rows}
    }catch(error){
        return error
    }
}

// update info on an account in database 
const updateAccount = async(accountName,accountUpdates)=>{
    try{
        // to format the query string
        const updates = await updateQueryBuilder(accountUpdates)

        const account = await pool.query(
            `UPDATE account
            SET ${updates}
            WHERE LOWER("accountName")=$1
            RETURNING *`,
            [accountName]
        )

        // if the account does not exist
        if(account.rows.length===0){
            throw {error:'account does not exist'}
        }
        return {account:account.rows}
    }catch(error){
        return error
    }
}


// get info on an account in database
const getAccount = async(accountName)=>{
    try{
        const account = await pool.query(
            `SELECT * FROM account 
            WHERE "accountName"=$1`,
            [accountName]
        )
        // if no account exists
        if(accountName.rows===0){
            throw {error:'No account found'}
        }
        return {account:account.rows}
    }catch(error){
        return error
    }
}

// delete an account in database
const deleteAccount = async(accountName)=>{
    try{
        const account = await pool.query(
            `DELETE FROM account
            WHERE lower("accountName")=$1
            RETURNING *`,
            [accountName.toLowerCase()]
        )
        // if the account doesn't exist
        if(account.rows.length===0){
            throw {error:"Account does not exist"}
        }
        return {account: account.rows}
    }catch(error){
        return error
    }
}


export {
    createAccount,
    updateAccount,
    getAccount,
    deleteAccount
}