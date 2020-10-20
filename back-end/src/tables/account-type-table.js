// `CREATE TABLE IF NOT EXISTS accountTypes(
//     id                          SERIAL PRIMARY KEY
//     "accountType"               VARCHAR(64) UNIQUE NOT NULL,
//     "shippingRates"             INTEGER NOT NULL,
//     "processingRates"           INTEGER NOT NULL,
//     "annualFee"                 MONEY NOT NULL,
//     "monthlyTransactionLimit"   INTEGER NOT NULL
// );`

import {pool} from '../database-stuff/database-pool'
import {buildValues, updateQueryBuilder} from '../database-stuff/database-queries'

const accountTypeParams = [
    `\"accountType\"`,
    `\"shippingRates\"`,
    `\"processingRates\"`,
    `\"annualFee\"`,
    `\"monthlyTransactionLimit\"`,
    `\"level\"`
]

// to create a new account type
const createAccountType = async (accountDetails)=>{
    try{
        const columns = await Object.keys(accountDetails).map(param=>`\"${param}\"`)
        const keys = await buildValues(Object.values(accountDetails))
        const text = `INSERT INTO accountTypes(${columns})
                        VALUES (${keys})
                        RETURNING * `
        const values = [...Object.values(accountDetails)]
        let accountType = await pool.query(text,values)
        return accountType.rows
    }catch(error){
        console.log(error)
    }
}

// get information on an account type
const getAccountTypeInfo = async(accountType)=>{
    try{
        const text = 
        `SELECT 
            * 
        FROM 
            accountTypes
        WHERE 
            \"accountType\" = 1$`
        const values = [accountType]
        let info = await pool.query(text,values)
        return info.rows
    }catch(error){
        console.log(error)
    }
}

const getAccountRates = async(accountType)=>{
    try{
        const text = 
            `SELECT 
                \"shippingRates\",
            \"shippingRates\",
            \"processingRates\",
            \"annualFee\",
            \"monthlyTransactionLimit\"
            FROM 
                accountTypes
            WHERE
                \"accountType\" = $1`
        const values = [accountType]
        const rates = await pool.query(text,values)
        return rates.rows
    }catch(error){
        console.log(error)
    }
}

export {
    createAccountType,
    getAccountTypeInfo,
    getAccountRates
}