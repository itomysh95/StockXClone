import {pool} from '../database-stuff/database-pool'
import {buildValues, updateQueryBuilder} from '../database-stuff/database-queries'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import {tokenForAccount} from '../middleware/auth'

// `CREATE TABLE IF NOT EXISTS ${tables[2]}(
//     id                  SERIAL PRIMARY KEY,
//     "accountName"       VARCHAR(64) UNIQUE NOT NULL,
//     "password"          VARCHAR(64) NOT NULL,
//     "email"             VARCHAR(255) UNIQUE NOT NULL,
//     "sneakersSold"      INTEGER,
//     "sneakersBought"    INTEGER
//     );`

const accountParams = [
    `\"accountName\"`,
    `\"password\"`,
    `\"email\"`,
    `\"sneakersSold\"`,
    `\"sneakersBought\"`,
    `id`]





// TODO validation function?
// validate and clean user input for creating a new account
const validateAndHash = async (reqBody)=>{
    try{
        //validation for email and password length must be >6 
        if(!validator.isEmail(reqBody.email||reqBody.password.length<6)){
            throw{error:'please provide a valid email and password'}
        }
        // hash the password
        const saltRounds = 12
        const hashPass = await bcrypt.hash(reqBody.password,saltRounds)
        // return the validiated and hashed account details
        return {...reqBody,password:hashPass}
    }catch(error){
        throw {error}
    }
}
// create a new account in database
const createAccount = async(reqBody)=>{
    try{
        const accountDetails = await validateAndHash(reqBody)
        // to format the query string
        const columns = await Object.keys(accountDetails).map(param=>`\"${param}\"`)
        const values = await buildValues(Object.values(accountDetails))
        // add to database
        const account = await pool.query(
            `INSERT INTO account(${columns})
            VALUES(${values})
            RETURNING *`
            ,[...Object.values(accountDetails)]
        )
        // get a jwt token for the account, Note: psql returns a row by default, so we take the
        // first and only account returned in the array
        const jwt = await tokenForAccount(account.rows[0])
        return {...account.rows, jwtToken:jwt}
    }catch(error){
        return {error}
    }
}

// update info on an account in database 
const updateAccount = async(accountName,accountUpdates)=>{
    try{
        let updates=accountUpdates;
        // if password is being changed
        if(accountUpdates.password){
            const saltRounds = 12
            const hashPass = await bcrypt.hash(accountUpdates.password,saltRounds)
            updates = {...accountUpdates,password:hashPass}
        }
        // to format the query string
        const columns = await updateQueryBuilder(updates)

        const account = await pool.query(
            `UPDATE account
            SET ${columns}
            WHERE LOWER(${accountParams[0]})=$1
            RETURNING *`,
            [accountName]
        )

        // if the account does not exist
        if(account.rows.length===0){
            throw {error:'account does not exist'}
        }
        return account.rows[0]
    }catch(error){
        return error
    }
}

// find account by id
// TODO
const findAccountById = async(id)=>{
    try{
        const account = await pool.query(
            `SELECT * FROM account
            WHERE ${accountParams[5]} = $1`,
            [id]
        )
        return account.rows[0]
    }catch(error){
        return error
    }
}


// verify user exists in database
// TODO
const verifyAccount = async(email)=>{
    try{
        const account = await pool.query(
            `SELECT * FROM account
            WHERE LOWER(${accountParams[2]})=$1`,
            [email.toLowerCase()]
        )
        if(account.rows.length===0){
            throw {error:'user does not exist'}
        }
        return account.rows[0]
    }catch(error){
        return error
    }
}

// get info on an account in database
const getAccount = async(accountName)=>{
    try{
        const account = await pool.query(
            `SELECT * FROM account 
            WHERE ${accountParams[0]}=$1`,
            [accountName]
        )
        // if no account exists
        if(account.rows===0){
            throw {error:'No account found'}
        }
        return account.rows[0]
    }catch(error){
        return error
    }
}

// delete an account in database
const deleteAccount = async(accountName)=>{
    try{
        const account = await pool.query(
            `DELETE FROM account
            WHERE ${accountParams[0]}=$1
            RETURNING *`,
            [accountName]
        )
        // if the account doesn't exist
        if(account.rows.length===0){
            throw {error:"Account does not exist"}
        }
        return account.rows[0]
    }catch(error){
        return error
    }
}

// TODO
const signinAccount = async(email,password)=>{
    try{
        // retrieve the account form the database
        const account = await pool.query(
            `SELECT * FROM account
            WHERE ${accountParams[2]}=$1`,[email]
        )
        // if the account does not exist
        if(account.rows.length===0){
            throw {error: "unable to login"}
        }
        const match = await bcrypt.compare(password,account.rows[0].password)
        // if the password is invalid
        if(!match){
            throw {error: "unable to login"}
        }
        // if it is all valid return the account
        return account.rows[0]
    }catch(error){
        return error
    }
}



export {
    createAccount,
    updateAccount,
    getAccount,
    deleteAccount,
    signinAccount,
    verifyAccount,
    findAccountById
}